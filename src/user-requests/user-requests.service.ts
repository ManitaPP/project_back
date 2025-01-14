/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserRequest } from './entities/user-request.model';
import { RequestType } from 'src/request-types/entities/request-type.model';
import { User } from 'src/users/models/user.model';

@Injectable()
export class UserRequestsService {
  constructor(
    @InjectModel(UserRequest) private requestModel: typeof UserRequest,
    @InjectModel(RequestType) private requestTypeModel: typeof RequestType,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async create(createUserRequestDto: CreateUserRequestDto) {
    const type = await this.requestTypeModel.findByPk(
      createUserRequestDto.reTypeId,
    );
    if (!type) {
      throw new Error('type not found');
    }

    const user = await this.userModel.findByPk(createUserRequestDto.userId);
    if (!user) {
      throw new Error('User not found');
    }
    const request = await this.requestModel.create({
      reason: createUserRequestDto.reason,
      file: createUserRequestDto.file,
      requestTypeId: type.id,
      userId: user.userId,
    });

    return request;
  }

  findAll() {
    return this.requestModel.findAll({
      include: [
        {
          model: RequestType,
          as: 'requestType',
        },
        {
          model: User,
          as: 'user',
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
        {
          model: User,
          required: false,
        },
      ],
    });
    if (!request) {
      throw new NotFoundException('request not found');
    }

    return request;
  }

  async update(id: number, updateUserRequestDto: UpdateUserRequestDto) {
    const request = await this.requestModel.findByPk(id);
    if (!request) {
      throw new NotFoundException('request not found');
    }
    await this.requestModel.update(updateUserRequestDto, {
      where: { id: id },
    });
    const updatedRequest = await this.requestModel.findByPk(id);
    if (!updatedRequest) {
      throw new NotFoundException('Error retrieving updated request');
    }

    return updatedRequest;
  }

  async remove(id: number) {
    const user = await this.requestModel.findByPk(id);
    if (user) {
      await user.destroy();
    }
  }
}
