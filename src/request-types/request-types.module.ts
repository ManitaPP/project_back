import { Module } from '@nestjs/common';
import { RequestTypesService } from './request-types.service';
import { RequestTypesController } from './request-types.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestType } from './entities/request-type.model';

@Module({
  imports: [SequelizeModule.forFeature([RequestType])],
  controllers: [RequestTypesController],
  providers: [RequestTypesService],
})
export class RequestTypesModule {}
