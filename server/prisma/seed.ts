import { PrismaClient, RoleName } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import slugify from 'slugify';

const prisma = new PrismaClient();

const permissions = [
  'pricing:read',
  'pricing:create',
  'pricing:update',
  'pricing:delete',
  'pricing:audit:read',
  'admin:activity:read',
];

type PlanSeed = {
  name: string;
  monthlyPrice: number;
  shiftTiming: string;
  workingHours: string;
  overtimeCharges: number;
  replacementGuarantee: string;
  availabilitySla: string;
  trialPeriod?: string;
  trainingIncluded: boolean;
  emergencyReplacement: boolean;
  transportIncluded?: boolean;
  features: string[];
};

type ServiceSeed = {
  name: string;
  description: string;
  icon: string;
  plans: PlanSeed[];
};

const services: ServiceSeed[] = [
  {
    name: 'Office Boy',
    description: 'Office support staff for daily admin, visitor, courier, and pantry coordination.',
    icon: 'briefcase',
    plans: [
      {
        name: 'Basic',
        monthlyPrice: 12000,
        shiftTiming: '9 AM to 6 PM',
        workingHours: '9 hours',
        overtimeCharges: 150,
        replacementGuarantee: 'Replacement within 48 hours',
        availabilitySla: '95% monthly availability',
        trialPeriod: '3 days',
        trainingIncluded: true,
        emergencyReplacement: false,
        features: ['Trained staff', 'Verified employee', 'Attendance support', 'Basic grooming standards'],
      },
      {
        name: 'Standard',
        monthlyPrice: 15500,
        shiftTiming: '9 AM to 6 PM',
        workingHours: '9 hours',
        overtimeCharges: 175,
        replacementGuarantee: 'Replacement within 24 hours',
        availabilitySla: '98% monthly availability',
        trialPeriod: '5 days',
        trainingIncluded: true,
        emergencyReplacement: true,
        features: ['Experienced staff', 'Verified employee', 'Replacement support', 'Attendance and supervisor checks'],
      },
    ],
  },
  {
    name: 'Housekeeping',
    description: 'Professional housekeeping manpower for offices, societies, hospitals, and institutions.',
    icon: 'sparkles',
    plans: [
      {
        name: 'Daily Care',
        monthlyPrice: 14000,
        shiftTiming: '8 AM to 5 PM',
        workingHours: '9 hours',
        overtimeCharges: 160,
        replacementGuarantee: 'Replacement within 24 hours',
        availabilitySla: '98% monthly availability',
        trialPeriod: '3 days',
        trainingIncluded: true,
        emergencyReplacement: true,
        features: ['Cleaning checklist', 'Uniformed staff', 'Verified employee', 'Supervisor inspection'],
      },
      {
        name: 'Premium Care',
        monthlyPrice: 19000,
        shiftTiming: 'Flexible shift',
        workingHours: '9 hours',
        overtimeCharges: 220,
        replacementGuarantee: 'Same-day replacement support',
        availabilitySla: '99% monthly availability',
        trialPeriod: '7 days',
        trainingIncluded: true,
        emergencyReplacement: true,
        transportIncluded: true,
        features: ['Deep-clean trained staff', 'Quality audits', 'Consumables coordination', 'Priority replacement'],
      },
    ],
  },
  {
    name: 'Security Staff',
    description: 'Verified security personnel for access control, gate management, and site safety.',
    icon: 'shield',
    plans: [
      {
        name: 'Standard Guard',
        monthlyPrice: 18000,
        shiftTiming: '12-hour shift',
        workingHours: '12 hours',
        overtimeCharges: 220,
        replacementGuarantee: 'Replacement within 24 hours',
        availabilitySla: '98% monthly availability',
        trainingIncluded: true,
        emergencyReplacement: true,
        features: ['Background verified', 'Gate register management', 'Visitor coordination', 'Incident escalation'],
      },
    ],
  },
];

async function main() {
  const createdPermissions = await Promise.all(
    permissions.map((key) =>
      prisma.permission.upsert({
        where: { key },
        update: {},
        create: { key, description: key.replaceAll(':', ' ') },
      }),
    ),
  );

  const adminRole = await prisma.role.upsert({
    where: { name: RoleName.ADMIN },
    update: {},
    create: { name: RoleName.ADMIN, description: 'Platform administrator' },
  });

  await Promise.all(
    createdPermissions.map((permission) =>
      prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: adminRole.id, permissionId: permission.id } },
        update: {},
        create: { roleId: adminRole.id, permissionId: permission.id },
      }),
    ),
  );

  const admin = await prisma.user.upsert({
    where: { email: 'admin@presenti.in' },
    update: {},
    create: {
      email: 'admin@presenti.in',
      fullName: 'Presenti Admin',
      passwordHash: await bcrypt.hash('Admin@12345', 12),
    },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: admin.id, roleId: adminRole.id } },
    update: {},
    create: { userId: admin.id, roleId: adminRole.id },
  });

  for (const [serviceIndex, service] of services.entries()) {
    const category = await prisma.serviceCategory.upsert({
      where: { slug: slugify(service.name, { lower: true, strict: true }) },
      update: {},
      create: {
        name: service.name,
        slug: slugify(service.name, { lower: true, strict: true }),
        description: service.description,
        icon: service.icon,
        displayOrder: serviceIndex + 1,
      },
    });

    for (const [planIndex, plan] of service.plans.entries()) {
      const createdPlan = await prisma.pricingPlan.upsert({
        where: { categoryId_slug: { categoryId: category.id, slug: slugify(plan.name, { lower: true, strict: true }) } },
        update: {},
        create: {
          categoryId: category.id,
          name: plan.name,
          slug: slugify(plan.name, { lower: true, strict: true }),
          monthlyPrice: plan.monthlyPrice,
          shiftTiming: plan.shiftTiming,
          workingHours: plan.workingHours,
          overtimeCharges: plan.overtimeCharges,
          replacementGuarantee: plan.replacementGuarantee,
          availabilitySla: plan.availabilitySla,
          trialPeriod: plan.trialPeriod,
          trainingIncluded: plan.trainingIncluded,
          emergencyReplacement: plan.emergencyReplacement,
          transportIncluded: plan.transportIncluded ?? false,
          displayOrder: planIndex + 1,
        },
      });

      await prisma.pricingPlanFeature.deleteMany({ where: { pricingPlanId: createdPlan.id } });
      for (const [featureIndex, label] of plan.features.entries()) {
        await prisma.pricingPlanFeature.create({
          data: {
            pricingPlanId: createdPlan.id,
            label,
            displayOrder: featureIndex + 1,
          },
        });
      }
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
