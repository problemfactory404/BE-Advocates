// create-clients.dto.ts
import { IsNumber, IsString, IsOptional, IsDate, IsEmail } from 'class-validator';

export class CreateClientsDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  case_id: number;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  mobile: string;

  @IsEmail()
  email: string;

  @IsString()
  role: string;

  @IsString()
  address: string;

  @IsString()
  identity_no: string;

  @IsString()
  vehicle_no: string;

  @IsNumber()
  updated_by: number;
}
