// create-cases.dto.ts
import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateCaseDetailsDto {
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

  @IsString()
  @IsOptional()
  file: string;

  @IsNumber()
  updated_by: number;

  @IsNumber()
  created_by: number;
}
