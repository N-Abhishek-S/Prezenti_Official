import { Injectable } from '@nestjs/common';
import { AuditAction, Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

export interface AuditContext {
  actorId?: string;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class PricingRepository {
  constructor(private readonly prisma: PrismaService) {}

  createCategory(data: Prisma.ServiceCategoryCreateInput) {
    return this.prisma.serviceCategory.create({ data });
  }

  findCategories(args: Prisma.ServiceCategoryFindManyArgs) {
    return this.prisma.serviceCategory.findMany(args);
  }

  countCategories(where: Prisma.ServiceCategoryWhereInput) {
    return this.prisma.serviceCategory.count({ where });
  }

  findCategoryById(id: string) {
    return this.prisma.serviceCategory.findFirst({
      where: { id, deletedAt: null },
      include: { pricingPlans: { where: { deletedAt: null }, include: { features: { where: { deletedAt: null }, orderBy: { displayOrder: 'asc' } } }, orderBy: { displayOrder: 'asc' } } },
    });
  }

  findCategoryBySlug(slug: string) {
    return this.prisma.serviceCategory.findFirst({ where: { slug, deletedAt: null } });
  }

  updateCategory(id: string, data: Prisma.ServiceCategoryUpdateInput) {
    return this.prisma.serviceCategory.update({ where: { id }, data });
  }

  createPlan(data: Prisma.PricingPlanCreateInput) {
    return this.prisma.pricingPlan.create({
      data,
      include: { category: true, features: { where: { deletedAt: null }, orderBy: { displayOrder: 'asc' } } },
    });
  }

  findPlans(args: Prisma.PricingPlanFindManyArgs) {
    return this.prisma.pricingPlan.findMany(args);
  }

  countPlans(where: Prisma.PricingPlanWhereInput) {
    return this.prisma.pricingPlan.count({ where });
  }

  findPlanById(id: string) {
    return this.prisma.pricingPlan.findFirst({
      where: { id, deletedAt: null },
      include: { category: true, features: { where: { deletedAt: null }, orderBy: { displayOrder: 'asc' } } },
    });
  }

  findPlanBySlug(categoryId: string, slug: string) {
    return this.prisma.pricingPlan.findFirst({ where: { categoryId, slug, deletedAt: null } });
  }

  updatePlan(id: string, data: Prisma.PricingPlanUpdateInput) {
    return this.prisma.pricingPlan.update({
      where: { id },
      data,
      include: { category: true, features: { where: { deletedAt: null }, orderBy: { displayOrder: 'asc' } } },
    });
  }

  createFeature(pricingPlanId: string, data: Prisma.PricingPlanFeatureCreateWithoutPricingPlanInput) {
    return this.prisma.pricingPlanFeature.create({ data: { ...data, pricingPlan: { connect: { id: pricingPlanId } } } });
  }

  findFeatureById(id: string) {
    return this.prisma.pricingPlanFeature.findFirst({ where: { id, deletedAt: null } });
  }

  updateFeature(id: string, data: Prisma.PricingPlanFeatureUpdateInput) {
    return this.prisma.pricingPlanFeature.update({ where: { id }, data });
  }

  createAuditLog(data: {
    action: AuditAction;
    entityType: string;
    entityId: string;
    categoryId?: string;
    planId?: string;
    oldValues?: Prisma.InputJsonValue;
    newValues?: Prisma.InputJsonValue;
    context?: AuditContext;
  }) {
    return this.prisma.pricingAuditLog.create({
      data: {
        action: data.action,
        entityType: data.entityType,
        entityId: data.entityId,
        categoryId: data.categoryId,
        planId: data.planId,
        oldValues: data.oldValues,
        newValues: data.newValues,
        actorId: data.context?.actorId,
        ipAddress: data.context?.ipAddress,
        userAgent: data.context?.userAgent,
      },
    });
  }

  createActivityLog(data: { action: string; module: string; message: string; metadata?: Prisma.InputJsonValue; context?: AuditContext }) {
    return this.prisma.adminActivityLog.create({
      data: {
        action: data.action,
        module: data.module,
        message: data.message,
        metadata: data.metadata,
        actorId: data.context?.actorId,
        ipAddress: data.context?.ipAddress,
        userAgent: data.context?.userAgent,
      },
    });
  }

  findAuditLogs(page = 1, limit = 50) {
    return this.prisma.pricingAuditLog.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { actor: { select: { id: true, email: true, fullName: true } } },
    });
  }

  findActivityLogs(page = 1, limit = 50) {
    return this.prisma.adminActivityLog.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { actor: { select: { id: true, email: true, fullName: true } } },
    });
  }
}
