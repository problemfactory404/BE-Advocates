import { Module } from '@nestjs/common';
import { CaseDetailsController } from './case_details.controller';
import { CaseDetailsService } from './case_details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case_Details } from './case_details.entity';
import { HttpResponse } from 'src/httpResponse';

@Module({
  imports: [TypeOrmModule.forFeature([Case_Details])],
  controllers: [CaseDetailsController],
  providers: [CaseDetailsService, HttpResponse]
})
export class CaseDetailsModule {}
