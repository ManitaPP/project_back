import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestType } from 'src/request-types/entities/request-type.model';

@Module({
  imports: [SequelizeModule.forFeature([Request, RequestType])],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
