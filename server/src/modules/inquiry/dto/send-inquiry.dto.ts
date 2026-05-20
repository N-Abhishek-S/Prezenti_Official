import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export const SERVICE_OPTIONS = [
  'Housekeeping',
  'Office Assistant',
  'Facility Supervisor',
  'Receptionist',
] as const;

export const TIME_PREFERENCES = [
  'Full Time (8 Hours)',
  'Half Time (4 Hours)',
] as const;

export const INQUIRY_TYPES = [
  'General Inquiry',
  'Request Callback',
  'Service Information',
  'Pricing Information',
  'Custom Requirement',
] as const;

const trimString = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

export class SendInquiryDto {
  @Transform(trimString)
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @Transform(trimString)
  @IsString()
  @Matches(/^(?:\+91|91)?[6-9]\d{9}$/, {
    message: 'phone must be a valid Indian mobile number',
  })
  phone!: string;

  @Transform(trimString)
  @IsString()
  @MinLength(2)
  @MaxLength(160)
  location!: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(4)
  @IsIn(SERVICE_OPTIONS, { each: true })
  services!: string[];

  @Transform(trimString)
  @IsString()
  @IsIn(TIME_PREFERENCES)
  timePreference!: string;

  @Transform(trimString)
  @IsString()
  @IsIn(INQUIRY_TYPES)
  inquiryType!: string;

  @Transform(trimString)
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'requiredDate must use YYYY-MM-DD format',
  })
  requiredDate!: string;

  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  message?: string;
}
