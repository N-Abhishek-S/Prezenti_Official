import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class SendChatMessageDto {
  @IsString()
  @MinLength(1)
  @MaxLength(1200)
  message!: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  service?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  propertyType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  workType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  sessionId?: string;
}
