/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReqRecvDto } from './dto/create-req-recv.dto';
import { UpdateReqRecvDto } from './dto/update-req-recv.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ReqRecv } from './entities/req-recv.model';
import { Request } from 'src/requests/entities/request.model';
import { User } from 'src/users/models/user.model';

@Injectable()
export class ReqRecvsService {
  constructor(
    @InjectModel(ReqRecv) private reqRecvModel: typeof ReqRecv,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Request) private requestModel: typeof Request,
  ) {}
  async create(createReqRecvDto: CreateReqRecvDto) {
    const request = await this.requestModel.findByPk(
      createReqRecvDto.requestId,
    );
    const user = await this.reqRecvModel.findByPk(createReqRecvDto.userId);
    const reqRecv = await this.reqRecvModel.create({
      ...createReqRecvDto,
      requestId: request.id,
      userId: user.id,
    });

    return reqRecv;
  }

  findAll() {
    return this.reqRecvModel.findAll({
      include: [
        {
          model: User,
          as: 'user',
        },
        {
          model: Request,
          as: 'request',
        },
      ],
    });
  }

  async findOne(id: number) {
    const reqRecv = await this.reqRecvModel.findByPk(id, {
      include: [
        {
          model: User,
          required: false,
        },
        {
          model: Request,
          required: false,
        },
      ],
    });
    if (!reqRecv) {
      throw new NotFoundException('reqRecv not found');
    }

    return reqRecv;
  }

  async update(id: number, updateReqRecvDto: UpdateReqRecvDto) {
    const reqRecv = await this.reqRecvModel.findByPk(id);
    if (!reqRecv) {
      throw new NotFoundException('reqRecv not found');
    }
    await this.reqRecvModel.update(updateReqRecvDto, {
      where: { id: id },
    });
    const updatedreqRecv = await this.reqRecvModel.findByPk(id);
    if (!updatedreqRecv) {
      throw new NotFoundException('Error retrieving updated reqRecv');
    }

    return updatedreqRecv;
  }

  async remove(id: number) {
    const reqRecv = await this.reqRecvModel.findByPk(id);
    if (reqRecv) {
      await reqRecv.destroy();
    }
  }
}
