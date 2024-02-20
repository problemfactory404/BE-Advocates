import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { HttpResponse } from 'src/httpResponse';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService,HttpResponse],
  exports: [UsersService],
})
export class UsersModule {}
