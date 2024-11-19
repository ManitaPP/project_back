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
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Village) private villageModel: typeof Village,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const village = await this.villageModel.findOne({
      where: { villageId: createUserDto.villageId },
    });
    if (!village) {
      throw new NotFoundException('Village not found');
    }
    const user = new User();
    user.thaiId = createUserDto.thaiId;
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.villageId = createUserDto.villageId;
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  findAll() {
    return this.userModel.findAll({
      order: [['thaiId', 'ASC']],
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
