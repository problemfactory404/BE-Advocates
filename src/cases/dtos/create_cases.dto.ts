// create-cases.dto.ts
import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateCasesDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  case_no: number;

  @IsString()
  section: string;

  @IsString()
  @IsOptional()
  versus: string;

  @IsString()
  @IsOptional()
  case_file_date: string;

  @IsString()
  @IsOptional()
  case_status: string;

  @IsDate()
  @IsOptional()
  present_date: Date;

  @IsOptional()
  @IsDate()
  last_date: Date;

  @IsNumber()
  @IsOptional()
  case_order_status: number;

  @IsNumber()
  updated_by: number;
}