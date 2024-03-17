import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { CasesModule } from './cases/cases.module';
import { Cases } from './cases/cases.entity';
import { CaseDetailsModule } from './case_details/case_details.module';

const entities = ['**/*.entity.js'];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host:process.env.DB_HOST,
      port:parseInt(process.env.DB_PORT),
      username:process.env.DB_USER,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_NAME,
      entities:entities,
      synchronize: true
    }),
    UsersModule,
    AuthModule,
    CasesModule,
    CaseDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
