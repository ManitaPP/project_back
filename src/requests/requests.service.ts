/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RequestType } from 'src/request-types/entities/request-type.model';
import { Request } from './entities/request.model';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request) private requestModel: typeof Request,
    @InjectModel(RequestType) private requestTypeModel: typeof RequestType,
  ) {}
  async create(createRequestDto: CreateRequestDto) {
    const requestType = await this.requestTypeModel.findByPk(
      createRequestDto.reTypeId,
    );
    const request = await this.requestModel.create({
      ...createRequestDto,
      requestType,
    });
    return request;
  }

  findAll() {
    return this.requestModel.findAll({
      include: [
        {
          model: RequestType,
          as: 'Type',
        },
      ],
    });
  }

  async findOne(id: number) {
    const request = await this.requestModel.findByPk(id, {
      include: [
        {
          model: RequestType,
          required: false,
        },
      ],
    });
    if (!request) {
      throw new NotFoundException('request not found');
    }
    return request;
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    const request = await this.requestModel.findByPk(id);
    if (!request) {
      throw new NotFoundException('request not found');
    }
    await this.requestModel.update(updateRequestDto, {
      where: { id: id },
    });
    const updatedRequest = await this.requestModel.findByPk(id);
    if (!updatedRequest) {
      throw new NotFoundException('Error retrieving updated request');
    }

    return updatedRequest;
  }

  async remove(id: number) {
    const request = await this.requestModel.findByPk(id);
    if (request) {
      await request.destroy();
    }
  }
}
