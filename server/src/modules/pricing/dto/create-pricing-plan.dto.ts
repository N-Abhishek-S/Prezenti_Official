import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreatePricingFeatureDto } from './create-pricing-feature.dto';

export class CreatePricingPlanDto {
  @ApiProperty({ example: 'uuid-of-service-category' })
  @IsUUID()
  categoryId!: string;

  @ApiProperty({ example: 'Standard' })
  @IsString()
  @MaxLength(140)
  name!: string;

  @ApiProperty({ example: 12000 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  monthlyPrice!: number;

  @ApiPropertyOptional({ example: 'INR', default: 'INR' })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;

  @ApiPropertyOptional({ example: '9 AM to 6 PM' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  shiftTiming?: string;

  @ApiPropertyOptional({ example: '9 hours' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  workingHours?: string;

  @ApiPropertyOptional({ example: 150 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  overtimeCharges?: number;

  @ApiPropertyOptional({ example: 'Same-day replacement support' })
  @IsOptional()
  @IsString()
  @MaxLength(160)
  replacementGuarantee?: string;

  @ApiPropertyOptional({ example: '98% monthly availability' })
  @IsOptional()
  @IsString()
  @MaxLength(160)
  availabilitySla?: string;

  @ApiPropertyOptional({ example: '3 days' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  trialPeriod?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  trainingIncluded?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  emergencyReplacement?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  transportIncluded?: boolean;

  @ApiPropertyOptional({ example: 'Uniform and attendance support included.' })
  @IsOptional()
  @IsString()
  customNotes?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;

  @ApiPropertyOptional({ example: { recommendedFor: 'Offices up to 75 seats' } })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @ApiPropertyOptional({ type: [CreatePricingFeatureDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePricingFeatureDto)
  features?: CreatePricingFeatureDto[];
}
