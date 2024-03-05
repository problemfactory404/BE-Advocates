import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Column, UpdateDateColumn } from "typeorm";

export class CreateCasesDto {
    @IsNumber()
    user_id: number;

    @IsString()
    case_no: string;

    @IsString()
    section: string;

    @IsString()
    versus: string;

    @IsDate()
    case_file_date: Date;

    @IsString()
    case_status: string;

    @IsDate()
    present_date: Date;

    @IsDate()
    last_date: Date;

    @IsDate()
    case_order_status: string;

    @IsNumber()
    updated_by: number;
}