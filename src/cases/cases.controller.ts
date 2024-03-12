import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CreateCasesDto } from './dtos/create_cases.dto';
import { UpdateCasesDto } from './dtos/update_cases.dto';

@Controller('cases')
export class CasesController {
    constructor(private readonly casesService: CasesService) { }

    @Post()
    create(@Body() createCasesDto: CreateCasesDto) {
        return this.casesService.create(createCasesDto);
    }

    @Patch('/:id')
    update(@Param('id') id: number, @Body() body: UpdateCasesDto) {
        return this.casesService.update(id, body);
    }

    @Get()
    getAll(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('orderBy') orderBy: string, @Query('direction') direction: string,) {
        return this.casesService.getAll(page, pageSize, orderBy, direction)
    }

    @Delete('/:id')
    deleteMember(@Param('id') id: number) {
        return this.casesService.delete(id);
    }
}