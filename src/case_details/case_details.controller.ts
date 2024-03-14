import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CaseDetailsService } from './case_details.service';
import { CreateCaseDetailsDto } from './dtos/create_case_details.dto';
import { UpdateCaseDetailsDto } from './dtos/update_case_details.dto';

@Controller('case-details')
export class CaseDetailsController {
    constructor(private readonly caseDetailsService: CaseDetailsService) { }

    @Post()
    create(@Body() createCasesDto: CreateCaseDetailsDto) {
        return this.caseDetailsService.create(createCasesDto);
    }

    @Patch('/:id')
    update(@Param('id') id: number, @Body() body: UpdateCaseDetailsDto) {
        return this.caseDetailsService.update(id, body);
    }

    @Get()
    getAll(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('orderBy') orderBy: string, @Query('direction') direction: string,) {
        return this.caseDetailsService.getAll(page, pageSize, orderBy, direction)
    }

    @Delete('/:id')
    deleteMember(@Param('id') id: number) {
        return this.caseDetailsService.delete(id);
    }
}
