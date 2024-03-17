import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Case_Details } from './case_details.entity';
import { Repository } from 'typeorm';
import { HttpResponse } from 'src/httpResponse';
import { CreateCaseDetailsDto } from './dtos/create_case_details.dto';
import { CASE_CREATED, CASE_NOT_FOUND, DELETE_SUCCESS, UPDATE_SUCCESS } from 'src/utils/constant';
import { UpdateCaseDetailsDto } from './dtos/update_case_details.dto';

@Injectable()
export class CaseDetailsService {
    constructor(
        @InjectRepository(Case_Details) private caseDetailsRepository: Repository<Case_Details>,
        private httpResponse: HttpResponse,
      ) { }
    
      async create(body: CreateCaseDetailsDto){
        try {
          const newCase = this.caseDetailsRepository.create(body);
          const caseInfo = await this.caseDetailsRepository.save(newCase);
          return this.httpResponse.success(caseInfo, CASE_CREATED);
        }catch (error) {
          return this.httpResponse.serverError({}, error.message);
        }
      }
    
      async update(id: number, body: UpdateCaseDetailsDto) {
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
          console.log("customerList : ",userList);
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
