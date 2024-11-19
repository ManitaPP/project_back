/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVillageDto } from './dto/create-village.dto';
import { UpdateVillageDto } from './dto/update-village.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Village } from './entities/village.model';

@Injectable()
export class VillagesService {
  constructor(@InjectModel(Village) private villageModel: typeof Village) {}
  async create(createVillageDto: CreateVillageDto) {
    const village = await this.villageModel.create(createVillageDto);
    return village;
  }

  findAll() {
    return this.villageModel.findAll();
  }

  async findOne(id: number) {
    const village = await this.villageModel.findByPk(id);
    if (!village) {
      throw new NotFoundException('village not found');
    } else {
      return village;
    }
  }

  async update(id: number, updateVillageDto: UpdateVillageDto) {
    const villageId = await this.villageModel.findByPk(id);
    if (!villageId) {
      throw new NotFoundException('villageId not found');
    } else {
      return await this.villageModel.update(updateVillageDto, {
        where: { villageId: id },
      });
    }
  }

  async remove(id: number) {
    const village = await this.villageModel.findByPk(id);
    if (village) {
      await village.destroy();
    }
  }
}
