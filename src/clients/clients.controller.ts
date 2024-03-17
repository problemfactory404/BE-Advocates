import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientsDto } from './dtos/create_clients.dto';
import { UpdateClientsDto } from './dtos/update_clients.dto';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) { }

    @Post()
    create(@Body() createCasesDto: CreateClientsDto) {
        return this.clientsService.create(createCasesDto);
    }

    @Patch('/:id')
    update(@Param('id') id: number, @Body() body: UpdateClientsDto) {
        return this.clientsService.update(id, body);
    }

    @Get()
    getAll(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('orderBy') orderBy: string, @Query('direction') direction: string,) {
        return this.clientsService.getAll(page, pageSize, orderBy, direction)
    }

    @Delete('/:id')
    deleteMember(@Param('id') id: number) {
        return this.clientsService.delete(id);
    }
}
