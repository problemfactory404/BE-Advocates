import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from './client.entity';
import { HttpResponse } from 'src/httpResponse';
import { CreateClientsDto } from './dtos/create_clients.dto';
import { CLIENTS_CREATED, CLIENTS_NOT_FOUND, DELETE_SUCCESS, UPDATE_SUCCESS } from 'src/utils/constant';
import { UpdateClientsDto } from './dtos/update_clients.dto';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Clients) private clientsRepository: Repository<Clients>,
        private httpResponse: HttpResponse,
    ) { }

    async create(body: CreateClientsDto) {
        try {
            const newCase = this.clientsRepository.create(body);
            const clientsInfo = await this.clientsRepository.save(newCase);
            return this.httpResponse.success(clientsInfo, CLIENTS_CREATED);
        } catch (error) {
            return this.httpResponse.serverError({}, error.message);
        }
    }

    async update(id: number, body: UpdateClientsDto) {
        try {
            const client = await this.clientsRepository.update(id, body);
            return this.httpResponse.success(client, UPDATE_SUCCESS);
        } catch (error) {
            return this.httpResponse.serverError({}, error.message);
        }
    }

    async getAll(page: number, pageSize: number, orderBy: string, direction: string) {
        try {
            let order = {};
            if (orderBy && direction) {
                order = { [orderBy]: direction };
            } else {
                order = { ["created_at"]: 'DESC' };
            }
            const clientsList = await this.clientsRepository.find({ order });
            // Apply pagination
            const totalRecords = clientsList.length;
            const totalPages = Math.ceil(totalRecords / pageSize);
            const startIndex = (page) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedClientsList = clientsList.slice(startIndex, endIndex);
            return this.httpResponse.success({
                users: paginatedClientsList,
                page,
                pageSize,
                totalRecords,
                totalPages
            }, "List Loaded Successfully");
        } catch (error) {
            return this.httpResponse.serverError({}, error.message);
        }
    }

    async delete(id: number) {
        try {
            const result = await this.clientsRepository.delete(id);
            if (result.affected === 0) {
                return this.httpResponse.badRequest({}, CLIENTS_NOT_FOUND);
            }
            return this.httpResponse.success(null, DELETE_SUCCESS);
        } catch (error) {
            return this.httpResponse.serverError({}, error.message);
        }
    }
}
