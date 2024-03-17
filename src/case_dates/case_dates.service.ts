import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CASE_DATE_CREATED, CASE_NOT_FOUND, DELETE_SUCCESS, UPDATE_SUCCESS } from 'src/utils/constant';
import { Repository } from 'typeorm';
import { Case_Dates } from './case_dates.entity';
import { HttpResponse } from 'src/httpResponse';
import { CreateCaseDatesDto } from './dtos/create_case_dates.dto';
import { UpdateCaseDatesDto } from './dtos/update_case_dates.dto';

@Injectable()
export class CaseDatesService {
    constructor(
        @InjectRepository(Case_Dates) private caseDetailsRepository: Repository<Case_Dates>,
        private httpResponse: HttpResponse,
      ) { }
    
      async create(body: CreateCaseDatesDto){
        try {
          const newCase = this.caseDetailsRepository.create(body);
          const caseInfo = await this.caseDetailsRepository.save(newCase);
          return this.httpResponse.success(caseInfo, CASE_DATE_CREATED);
        }catch (error) {
          return this.httpResponse.serverError({}, error.message);
        }
      }
    
      async update(id: number, body: UpdateCaseDatesDto) {
        try {
          const user = await this.caseDetailsRepository.update(id, body);
          return this.httpResponse.success(user, UPDATE_SUCCESS);
        } catch (error) {
          return this.httpResponse.serverError({}, error.message);
        }
      }
    
      async getAll(page: number, pageSize: number, orderBy: string, direction: string) {
        try {
          let order = {};
          if(orderBy && direction){
            order = { [orderBy]: direction };
          }else{
            order = { ["created_at"]: 'DESC' };
          }
          const userList = await this.caseDetailsRepository.find({order});
          // Apply pagination
          const totalRecords = userList.length;
          const totalPages = Math.ceil(totalRecords / pageSize);
          const startIndex = (page) * pageSize;
          const endIndex = startIndex + pageSize;
          const paginatedUserList = userList.slice(startIndex, endIndex);
          return this.httpResponse.success({
            users: paginatedUserList,
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
          const result = await this.caseDetailsRepository.delete(id);
          if (result.affected === 0) {
            return this.httpResponse.badRequest({}, CASE_NOT_FOUND);
          }
          return this.httpResponse.success(null, DELETE_SUCCESS);
        } catch (error) {
          return this.httpResponse.serverError({}, error.message);
        }
      }
}
