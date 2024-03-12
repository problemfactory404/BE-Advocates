// create-cases.dto.ts
import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateCasesDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  case_no: number;

  @IsString()
  section: string;

  @IsString()
  versus: string;

  @IsString()
  case_file_date: string;

  @IsString()
  case_status: string;

  @IsDate()
  present_date: Date;

  @IsDate()
  last_date: Date;

  @IsNumber()
  case_order_status: number;

  @IsNumber()
  updated_by: number;
}
