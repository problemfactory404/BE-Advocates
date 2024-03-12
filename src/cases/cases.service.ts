import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponse } from 'src/httpResponse';
import { Repository } from 'typeorm';
import { CreateCasesDto } from './dtos/create_cases.dto';
import { Cases } from './cases.entity';
import { CASE_CREATED, CASE_NOT_FOUND, DELETE_SUCCESS, UPDATE_SUCCESS } from 'src/utils/constant';
import { UpdateCasesDto } from './dtos/update_cases.dto';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Cases) private caseRepository: Repository<Cases>,
    private httpResponse: HttpResponse,
  ) { }

  async create(body: CreateCasesDto){
    try {
      const newCase = this.caseRepository.create(body);
      const caseInfo = await this.caseRepository.save(newCase);
      return this.httpResponse.success(caseInfo, CASE_CREATED);
    }catch (error) {
      return this.httpResponse.serverError({}, error.message);
    }
  }

  async update(id: number, body: UpdateCasesDto) {
    try {
      const user = await this.caseRepository.update(id, body);
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
      const userList = await this.caseRepository.find({order});
      console.log("customerList : ",userList);
      // Apply pagination
      const totalRecords = userList.length;
      const totalPages = Math.ceil(totalRecords / pageSize);
      const startIndex = (page) * pageSize;
      const endIndex = startIndex + pageSize;
      console.log("totalRecords : ",totalRecords," ||  totalPages : ",totalPages," ||  startIndex : ",startIndex," ||  endIndex : ",endIndex);
      const paginatedUserList = userList.slice(startIndex, endIndex);
      console.log("paginatedUserList : ",paginatedUserList);
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
      const result = await this.caseRepository.delete(id);
      if (result.affected === 0) {
        return this.httpResponse.badRequest({}, CASE_NOT_FOUND);
      }
      return this.httpResponse.success(null, DELETE_SUCCESS);
    } catch (error) {
      return this.httpResponse.serverError({}, error.message);
    }
  }
}
