import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction, Prisma } from '@prisma/client';
import slugify from 'slugify';
import { CreatePricingFeatureDto } from './dto/create-pricing-feature.dto';
import { CreatePricingPlanDto } from './dto/create-pricing-plan.dto';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { PricingQueryDto } from './dto/pricing-query.dto';
import { UpdatePricingFeatureDto } from './dto/update-pricing-feature.dto';
import { UpdatePricingPlanDto } from './dto/update-pricing-plan.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { AuditContext, PricingRepository } from './repositories/pricing.repository';

@Injectable()
export class PricingService {
  constructor(private readonly repository: PricingRepository) {}

  async createCategory(dto: CreateServiceCategoryDto, context: AuditContext) {
    const slug = await this.buildUniqueCategorySlug(dto.name);
    const category = await this.repository.createCategory({
      name: dto.name.trim(),
      slug,
      description: dto.description,
      icon: dto.icon,
      isActive: dto.isActive ?? true,
      displayOrder: dto.displayOrder ?? 0,
      metadata: this.toJson(dto.metadata),
    });

    await this.audit(AuditAction.CREATE, 'service_category', category.id, undefined, category, { categoryId: category.id, context });
    return this.success(this.mapCategory(category));
  }

  async findCategories(query: PricingQueryDto, includeInactive = false) {
    const where: Prisma.ServiceCategoryWhereInput = {
      deletedAt: null,
      ...(includeInactive ? (query.isActive === undefined ? {} : { isActive: query.isActive }) : { isActive: true }),
      ...(query.search
        ? { OR: [{ name: { contains: query.search, mode: 'insensitive' } }, { description: { contains: query.search, mode: 'insensitive' } }] }
        : {}),
    };
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const [items, total] = await Promise.all([
      this.repository.findCategories({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ displayOrder: query.sortOrder ?? 'asc' }, { name: 'asc' }],
      }),
      this.repository.countCategories(where),
    ]);

    return this.paginated(items.map((item) => this.mapCategory(item)), total, page, limit);
  }

  async findCategory(id: string) {
    const category = await this.repository.findCategoryById(id);
    if (!category) throw new NotFoundException('Service category not found');
    return this.success(this.mapCategory(category));
  }

  async updateCategory(id: string, dto: UpdateServiceCategoryDto, context: AuditContext) {
    const existing = await this.repository.findCategoryById(id);
    if (!existing) throw new NotFoundException('Service category not found');

    const slug = dto.name && dto.name !== existing.name ? await this.buildUniqueCategorySlug(dto.name, id) : undefined;
    const category = await this.repository.updateCategory(id, {
      name: dto.name?.trim(),
      slug,
      description: dto.description,
      icon: dto.icon,
      isActive: dto.isActive,
      displayOrder: dto.displayOrder,
      metadata: this.toJson(dto.metadata),
    });

    await this.audit(AuditAction.UPDATE, 'service_category', id, existing, category, { categoryId: id, context });
    return this.success(this.mapCategory(category));
  }

  async deleteCategory(id: string, context: AuditContext) {
    const existing = await this.repository.findCategoryById(id);
    if (!existing) throw new NotFoundException('Service category not found');
    const category = await this.repository.updateCategory(id, { deletedAt: new Date(), isActive: false });
    await this.audit(AuditAction.DELETE, 'service_category', id, existing, category, { categoryId: id, context });
    return this.success({ id, deleted: true });
  }

  async createPlan(dto: CreatePricingPlanDto, context: AuditContext) {
    const category = await this.repository.findCategoryById(dto.categoryId);
    if (!category) throw new NotFoundException('Service category not found');

    const slug = await this.buildUniquePlanSlug(dto.categoryId, dto.name);
    const plan = await this.repository.createPlan({
      category: { connect: { id: dto.categoryId } },
      name: dto.name.trim(),
      slug,
      monthlyPrice: new Prisma.Decimal(dto.monthlyPrice),
      currency: dto.currency ?? 'INR',
      shiftTiming: dto.shiftTiming,
      workingHours: dto.workingHours,
      overtimeCharges: dto.overtimeCharges === undefined ? undefined : new Prisma.Decimal(dto.overtimeCharges),
      replacementGuarantee: dto.replacementGuarantee,
      availabilitySla: dto.availabilitySla,
      trialPeriod: dto.trialPeriod,
      trainingIncluded: dto.trainingIncluded ?? false,
      emergencyReplacement: dto.emergencyReplacement ?? false,
      transportIncluded: dto.transportIncluded ?? false,
      customNotes: dto.customNotes,
      isActive: dto.isActive ?? true,
      displayOrder: dto.displayOrder ?? 0,
      metadata: this.toJson(dto.metadata),
      features: dto.features?.length
        ? { create: dto.features.map((feature) => this.featureCreateInput(feature)) }
        : undefined,
    });

    await this.audit(AuditAction.CREATE, 'pricing_plan', plan.id, undefined, plan, {
      categoryId: dto.categoryId,
      planId: plan.id,
      context,
    });
    return this.success(this.mapPlan(plan));
  }

  async findPlans(query: PricingQueryDto, includeInactive = false) {
    const where: Prisma.PricingPlanWhereInput = {
      deletedAt: null,
      category: { deletedAt: null },
      ...(includeInactive ? (query.isActive === undefined ? {} : { isActive: query.isActive }) : { isActive: true, category: { deletedAt: null, isActive: true } }),
      ...(query.categoryId ? { categoryId: query.categoryId } : {}),
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: 'insensitive' } },
              { customNotes: { contains: query.search, mode: 'insensitive' } },
              { category: { name: { contains: query.search, mode: 'insensitive' } } },
            ],
          }
        : {}),
    };
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const sortBy = query.sortBy ?? 'displayOrder';
    const [items, total] = await Promise.all([
      this.repository.findPlans({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ [sortBy]: query.sortOrder ?? 'asc' }, { name: 'asc' }],
        include: { category: true, features: { where: { deletedAt: null, ...(includeInactive ? {} : { isActive: true }) }, orderBy: { displayOrder: 'asc' } } },
      }),
      this.repository.countPlans(where),
    ]);

    return this.paginated(items.map((item) => this.mapPlan(item)), total, page, limit);
  }

  async findPlan(id: string) {
    const plan = await this.repository.findPlanById(id);
    if (!plan) throw new NotFoundException('Pricing plan not found');
    return this.success(this.mapPlan(plan));
  }

  async updatePlan(id: string, dto: UpdatePricingPlanDto, context: AuditContext) {
    const existing = await this.repository.findPlanById(id);
    if (!existing) throw new NotFoundException('Pricing plan not found');

    if (dto.categoryId && dto.categoryId !== existing.categoryId) {
      const category = await this.repository.findCategoryById(dto.categoryId);
      if (!category) throw new NotFoundException('Service category not found');
    }

    const categoryId = dto.categoryId ?? existing.categoryId;
    const slug = dto.name && dto.name !== existing.name ? await this.buildUniquePlanSlug(categoryId, dto.name, id) : undefined;
    const plan = await this.repository.updatePlan(id, {
      category: dto.categoryId ? { connect: { id: dto.categoryId } } : undefined,
      name: dto.name?.trim(),
      slug,
      monthlyPrice: dto.monthlyPrice === undefined ? undefined : new Prisma.Decimal(dto.monthlyPrice),
      currency: dto.currency,
      shiftTiming: dto.shiftTiming,
      workingHours: dto.workingHours,
      overtimeCharges: dto.overtimeCharges === undefined ? undefined : new Prisma.Decimal(dto.overtimeCharges),
      replacementGuarantee: dto.replacementGuarantee,
      availabilitySla: dto.availabilitySla,
      trialPeriod: dto.trialPeriod,
      trainingIncluded: dto.trainingIncluded,
      emergencyReplacement: dto.emergencyReplacement,
      transportIncluded: dto.transportIncluded,
      customNotes: dto.customNotes,
      isActive: dto.isActive,
      displayOrder: dto.displayOrder,
      metadata: this.toJson(dto.metadata),
    });

    await this.audit(AuditAction.UPDATE, 'pricing_plan', id, existing, plan, {
      categoryId: plan.categoryId,
      planId: id,
      context,
    });
    return this.success(this.mapPlan(plan));
  }

  async deletePlan(id: string, context: AuditContext) {
    const existing = await this.repository.findPlanById(id);
    if (!existing) throw new NotFoundException('Pricing plan not found');
    const plan = await this.repository.updatePlan(id, { deletedAt: new Date(), isActive: false });
    await this.audit(AuditAction.DELETE, 'pricing_plan', id, existing, plan, { categoryId: plan.categoryId, planId: id, context });
    return this.success({ id, deleted: true });
  }

  async createFeature(planId: string, dto: CreatePricingFeatureDto, context: AuditContext) {
    const plan = await this.repository.findPlanById(planId);
    if (!plan) throw new NotFoundException('Pricing plan not found');
    const feature = await this.repository.createFeature(planId, this.featureCreateInput(dto));
    await this.audit(AuditAction.CREATE, 'pricing_plan_feature', feature.id, undefined, feature, {
      categoryId: plan.categoryId,
      planId,
      context,
    });
    return this.success(feature);
  }

  async updateFeature(id: string, dto: UpdatePricingFeatureDto, context: AuditContext) {
    const existing = await this.repository.findFeatureById(id);
    if (!existing) throw new NotFoundException('Pricing feature not found');
    const feature = await this.repository.updateFeature(id, dto);
    await this.audit(AuditAction.UPDATE, 'pricing_plan_feature', id, existing, feature, {
      planId: feature.pricingPlanId,
      context,
    });
    return this.success(feature);
  }

  async deleteFeature(id: string, context: AuditContext) {
    const existing = await this.repository.findFeatureById(id);
    if (!existing) throw new NotFoundException('Pricing feature not found');
    const feature = await this.repository.updateFeature(id, { deletedAt: new Date(), isActive: false });
    await this.audit(AuditAction.DELETE, 'pricing_plan_feature', id, existing, feature, {
      planId: feature.pricingPlanId,
      context,
    });
    return this.success({ id, deleted: true });
  }

  async auditLogs(page?: number, limit?: number) {
    return this.success(await this.repository.findAuditLogs(page, limit));
  }

  async activityLogs(page?: number, limit?: number) {
    return this.success(await this.repository.findActivityLogs(page, limit));
  }

  private async audit(
    action: AuditAction,
    entityType: string,
    entityId: string,
    oldValues: unknown,
    newValues: unknown,
    options: { categoryId?: string; planId?: string; context: AuditContext },
  ) {
    await this.repository.createAuditLog({
      action,
      entityType,
      entityId,
      categoryId: options.categoryId,
      planId: options.planId,
      oldValues: this.toJson(oldValues),
      newValues: this.toJson(newValues),
      context: options.context,
    });
    await this.repository.createActivityLog({
      action,
      module: 'pricing',
      message: `${action.toLowerCase()} ${entityType}`,
      metadata: this.toJson({ entityType, entityId }),
      context: options.context,
    });
  }

  private async buildUniqueCategorySlug(name: string, excludeId?: string) {
    return this.buildUniqueSlug(name, async (slug) => {
      const existing = await this.repository.findCategoryBySlug(slug);
      return Boolean(existing && existing.id !== excludeId);
    });
  }

  private async buildUniquePlanSlug(categoryId: string, name: string, excludeId?: string) {
    return this.buildUniqueSlug(name, async (slug) => {
      const existing = await this.repository.findPlanBySlug(categoryId, slug);
      return Boolean(existing && existing.id !== excludeId);
    });
  }

  private async buildUniqueSlug(name: string, exists: (slug: string) => Promise<boolean>) {
    const base = slugify(name, { lower: true, strict: true, trim: true });
    if (!base) throw new ConflictException('Unable to generate slug');

    let slug = base;
    let attempt = 1;
    while (await exists(slug)) {
      attempt += 1;
      slug = `${base}-${attempt}`;
    }

    return slug;
  }

  private featureCreateInput(dto: CreatePricingFeatureDto) {
    return {
      label: dto.label.trim(),
      description: dto.description,
      isHighlighted: dto.isHighlighted ?? false,
      isActive: dto.isActive ?? true,
      displayOrder: dto.displayOrder ?? 0,
    };
  }

  private mapCategory(category: any) {
    return {
      ...category,
      pricingPlans: category.pricingPlans?.map((plan: any) => this.mapPlan(plan)),
    };
  }

  private mapPlan(plan: any) {
    return {
      ...plan,
      monthlyPrice: Number(plan.monthlyPrice),
      overtimeCharges: plan.overtimeCharges === null || plan.overtimeCharges === undefined ? null : Number(plan.overtimeCharges),
    };
  }

  private toJson(value: unknown): Prisma.InputJsonValue | undefined {
    if (value === undefined) return undefined;
    return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
  }

  private success<T>(data: T) {
    return { success: true, data };
  }

  private paginated<T>(items: T[], total: number, page: number, limit: number) {
    return {
      success: true,
      data: items,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}
