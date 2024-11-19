/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Village } from 'src/villages/entities/village.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create({
      ...createUserDto,
      leaderId: createUserDto.leaderId,
    });

    return user;
  }

  findAll() {
    return this.userModel.findAll({
      order: [['thaiId', 'ASC']],
      include: [
        {
          model: User,
          as: 'leader',
        },
      ],
    });
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('user not found');
    } else {
      return user;
    }
  }

  async findOneByEmail(email: string) {
    if (!email || typeof email !== 'string') {
      throw new BadRequestException('Invalid email provided');
    }
    const user = await this.userModel.findOne({
      where: { email: email },
    });
    return user || null;
  }

  async findOneByThaiId(id: string) {
    console.log(id);
    if (!id || typeof id !== 'string') {
      throw new BadRequestException('Invalid id provided');
    }
    const user = await this.userModel.findOne({
      where: { thaiId: id },
    });
    // if (!user) {
    //   throw new BadRequestException('User not found');
    // }
    return user || null;
  }

  async findByLeader(id: number) {
    if (!id) {
      throw new BadRequestException('ไม่มี id');
    }
    const user = await this.userModel.findAll({
      where: { leaderId: id },
    });
    return user || null;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userId = await this.userModel.findByPk(id);
    if (!userId) {
      throw new NotFoundException('user not found');
    } else {
      return await this.userModel.update(updateUserDto, {
        where: { userId: id },
      });
    }
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id);
    if (user) {
      await user.destroy();
    }
  }
}
