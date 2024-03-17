import { Module } from '@nestjs/common';
import { CaseDatesController } from './case_dates.controller';
import { CaseDatesService } from './case_dates.service';
import { HttpResponse } from 'src/httpResponse';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case_Dates } from './case_dates.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Case_Dates])],
  controllers: [CaseDatesController],
  providers: [CaseDatesService, HttpResponse]
})
export class CaseDatesModule {}
