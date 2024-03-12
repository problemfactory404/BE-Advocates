import { Module } from '@nestjs/common';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cases } from './cases.entity';
import { HttpResponse } from 'src/httpResponse';

@Module({
  imports: [TypeOrmModule.forFeature([Cases])],
  controllers: [CasesController],
  providers: [CasesService, HttpResponse],
  exports:[CasesService]
})
export class CasesModule { }
