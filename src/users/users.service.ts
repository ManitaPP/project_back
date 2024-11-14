import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('มีอีเมลนี้อยู๋ในระบบแล้ว');
    }

    const existingThaiId = await this.userModel.findOne({
      where: { thaiId: createUserDto.thaiId },
    });
    if (existingThaiId) {
      throw new BadRequestException('รหัสบัตรประชาชนนี้มีอยู๋ในระบบแล้ว');
    }

    try {
      return await this.userModel.create(createUserDto);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException(
          'Duplicate field error: Email or Thai ID already exists.',
        );
      }
      console.error('Database error:', error);
      throw new BadRequestException(
        'Unable to create user. Please check the input data and try again.',
      );
    }
  }

  findAll() {
    return this.userModel.findAll();
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
    console.log(email);
    if (!email || typeof email !== 'string') {
      throw new BadRequestException('Invalid email provided');
    }
    const user = await this.userModel.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
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
