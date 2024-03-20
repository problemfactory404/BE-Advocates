import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CaseDatesService } from './case_dates.service';
import { CreateCaseDatesDto } from './dtos/create_case_dates.dto';
import { UpdateCaseDatesDto } from './dtos/update_case_dates.dto';

@Controller('case-dates')
export class CaseDatesController {
    constructor(private readonly caseDatesService: CaseDatesService) { }

    @Post()
    create(@Body() createCaseDatesDto: CreateCaseDatesDto) {
        return this.caseDatesService.create(createCaseDatesDto);
    }

    @Patch('/:id')
    update(@Param('id') id: number, @Body() body: UpdateCaseDatesDto) {
        return this.caseDatesService.update(id, body);
    }

    @Get()
    getAll(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('orderBy') orderBy: string, @Query('direction') direction: string,) {
        return this.caseDatesService.getAll(page, pageSize, orderBy, direction)
    }

    @Delete('/:id')
    deleteMember(@Param('id') id: number) {
        return this.caseDatesService.delete(id);
    }
}
