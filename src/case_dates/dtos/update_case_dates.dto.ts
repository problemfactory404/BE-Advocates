// create-cases.dto.ts
import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateCaseDatesDto {
  @IsNumber()
  case_id: number;

  @IsNumber()
  case_date: number;

  @IsString()
  @IsOptional()
  order: string;

  @IsString()
  @IsOptional()
  payment: string;

  @IsNumber()
  updated_by: number;

  @IsNumber()
  created_by: number;
}
