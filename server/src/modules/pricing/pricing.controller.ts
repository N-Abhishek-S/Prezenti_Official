import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { Request } from 'express';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { CreatePricingFeatureDto } from './dto/create-pricing-feature.dto';
import { CreatePricingPlanDto } from './dto/create-pricing-plan.dto';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { PricingQueryDto } from './dto/pricing-query.dto';
import { UpdatePricingFeatureDto } from './dto/update-pricing-feature.dto';
import { UpdatePricingPlanDto } from './dto/update-pricing-plan.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { PricingService } from './pricing.service';

const pricingAdmins = [RoleName.SUPER_ADMIN, RoleName.ADMIN, RoleName.PRICING_MANAGER];

@ApiTags('Service Pricing')
@ApiBearerAuth()
@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Public()
  @Get('categories')
  findPublicCategories(@Query() query: PricingQueryDto) {
    return this.pricingService.findCategories(query, false);
  }

  @Roles(...pricingAdmins)
  @Post('categories')
  createCategory(@Body() dto: CreateServiceCategoryDto, @CurrentUser() user: AuthenticatedUser, @Req() req: Request) {
    return this.pricingService.createCategory(dto, this.context(user, req));
  }

  @Public()
  @Get('categories/:id')
  findCategory(@Param('id') id: string) {
    return this.pricingService.findCategory(id);
  }

  @Roles(...pricingAdmins)
  @Patch('categories/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateServiceCategoryDto,
    @CurrentUser() user: AuthenticatedUser,
    @Req() req: Request,
  ) {
    return this.pricingService.updateCategory(id, dto, this.context(user, req));
  }

  @Roles(...pricingAdmins)
  @Delete('categories/:id')
  deleteCategory(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser, @Req() req: Request) {
    return this.pricingService.deleteCategory(id, this.context(user, req));
  }

  @Public()
  @Get('plans')
  findPublicPlans(@Query() query: PricingQueryDto) {
    return this.pricingService.findPlans(query, false);
  }

  @Roles(...pricingAdmins)
  @Get('admin/plans')
  findAdminPlans(@Query() query: PricingQueryDto) {
    return this.pricingService.findPlans(query, true);
  }

  @Roles(...pricingAdmins)
  @Get('admin/categories')
  findAdminCategories(@Query() query: PricingQueryDto) {
    return this.pricingService.findCategories(query, true);
  }

  @Roles(...pricingAdmins)
  @Post('plans')
  createPlan(@Body() dto: CreatePricingPlanDto, @CurrentUser() user: AuthenticatedUser, @Req() req: Request) {
    return this.pricingService.createPlan(dto, this.context(user, req));
  }

  @Public()
  @Get('plans/:id')
  findPlan(@Param('id') id: string) {
    return this.pricingService.findPlan(id);
  }

  @Roles(...pricingAdmins)
  @Patch('plans/:id')
  updatePlan(
    @Param('id') id: string,
    @Body() dto: UpdatePricingPlanDto,
    @CurrentUser() user: AuthenticatedUser,
    @Req() req: Request,
  ) {
    return this.pricingService.updatePlan(id, dto, this.context(user, req));
  }

  @Roles(...pricingAdmins)
  @Delete('plans/:id')
  deletePlan(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser, @Req() req: Request) {
    return this.pricingService.deletePlan(id, this.context(user, req));
  }

  @Roles(...pricingAdmins)
  @Post('plans/:planId/features')
  createFeature(
    @Param('planId') planId: string,
    @Body() dto: CreatePricingFeatureDto,
    @CurrentUser() user: AuthenticatedUser,
    @Req() req: Request,
  ) {
    return this.pricingService.createFeature(planId, dto, this.context(user, req));
  }

  @Roles(...pricingAdmins)
  @Patch('features/:id')
  updateFeature(
    @Param('id') id: string,
    @Body() dto: UpdatePricingFeatureDto,
    @CurrentUser() user: AuthenticatedUser,
    @Req() req: Request,
  ) {
    return this.pricingService.updateFeature(id, dto, this.context(user, req));
  }

  @Roles(...pricingAdmins)
  @Delete('features/:id')
  deleteFeature(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser, @Req() req: Request) {
    return this.pricingService.deleteFeature(id, this.context(user, req));
  }

  @Roles(...pricingAdmins)
  @Get('admin/audit-logs')
  auditLogs(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.pricingService.auditLogs(page, limit);
  }

  @Roles(...pricingAdmins)
  @Get('admin/activity-logs')
  activityLogs(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.pricingService.activityLogs(page, limit);
  }

  private context(user: AuthenticatedUser, req: Request) {
    return {
      actorId: user.sub,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    };
  }
}
