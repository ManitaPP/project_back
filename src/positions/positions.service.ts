/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Position } from './entities/position.model';
import { Department } from 'src/departments/entities/department.model';
import { User } from 'src/users/models/user.model';
import { Op } from 'sequelize';

@Injectable()
export class PositionsService {
  constructor(@InjectModel(Position) private positionModel: typeof Position) {}
  async create(createPositionDto: CreatePositionDto) {
    const { priority } = createPositionDto;

    if (priority) {
      // ค้นหาตำแหน่งที่มี priority เท่ากับค่าที่จะสร้างใหม่
      const conflictingPositions = await this.positionModel.findAll({
        where: {
          priority: priority,
        },
      });

      if (conflictingPositions.length > 0) {
        await this.positionModel.increment('priority', {
          by: 1,
          where: {
            priority: {
              [Op.gte]: priority,
            },
          },
        });
      }
    }

    const position = await this.positionModel.create(createPositionDto);
    return position;
  }
  findAll() {
    return this.positionModel.findAll();
  }

  findOne(id: number) {
    const position = this.positionModel.findByPk(id);
    if (!position) {
      throw new Error('position not found');
    }
    return position;
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    const positionId = await this.positionModel.findByPk(id);
    if (!positionId) {
      throw new NotFoundException('position not found');
    } else {
      const position = await this.positionModel.update(updatePositionDto, {
        where: { id: id },
      });
      return position;
    }
  }

  async remove(id: number) {
    const position = await this.positionModel.findByPk(id);
    if (position) {
      await position.destroy();
    }
  }
}
