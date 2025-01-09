/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestTypeDto } from './dto/create-request-type.dto';
import { UpdateRequestTypeDto } from './dto/update-request-type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RequestType } from './entities/request-type.model';

@Injectable()
export class RequestTypesService {
  constructor(
    @InjectModel(RequestType) private requestTypeModel: typeof RequestType,
  ) {}
  async create(createRequestTypeDto: CreateRequestTypeDto) {
    const requestType =
      await this.requestTypeModel.create(createRequestTypeDto);
    return requestType;
  }

  findAll() {
    return this.requestTypeModel.findAll();
  }

  findOne(id: number) {
    const requestType = this.requestTypeModel.findByPk(id);
    if (!requestType) {
      throw new Error('RequestType not found');
    }
    return requestType;
  }

  async update(id: number, updateRequestTypeDto: UpdateRequestTypeDto) {
    const requestTypeId = await this.requestTypeModel.findByPk(id);
    if (!requestTypeId) {
      throw new NotFoundException('requestType not found');
    } else {
      const requestType = await this.requestTypeModel.update(
        updateRequestTypeDto,
        {
          where: { id: id },
        },
      );
      return requestType;
    }
  }

  async remove(id: number) {
    const requestType = await this.requestTypeModel.findByPk(id);
    if (requestType) {
      await requestType.destroy();
    }
  }
}
