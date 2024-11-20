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
import { Department } from 'src/departments/entities/department.model';
import { Position } from 'src/positions/entities/position.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Department) private departmentModel: typeof Department,
    @InjectModel(Position) private positionModel: typeof Position,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const position = await this.positionModel.findByPk(
      createUserDto.positionId,
    );
    const department = await this.departmentModel.findByPk(
      createUserDto.departmentId,
    );
    const user = await this.userModel.create({
      ...createUserDto,
      leaderId: createUserDto.leaderId,
      positionId: position.id,
      departmentId: department.id,
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
        {
          model: Department,
          as: 'department',
        },
        {
          model: Position,
          as: 'position',
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
  async findPositionByLeaderId(id: number) {
    if (!id) {
      throw new BadRequestException('ไม่มี id');
    }
    const findUsersRecursively = async (leaderId: number) => {
      const users = await this.userModel.findAll({
        where: { leaderId: leaderId },
      });
      if (users.length === 0) {
        return [];
      }
      const result = [];
      for (const user of users) {
        const subordinates = await findUsersRecursively(user.userId);
        console.log(subordinates);
        result.push({
          ...user.toJSON(),
          subordinates,
        });
      }

      return result;
    };

    const users = await findUsersRecursively(id);
    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userId = await this.userModel.findByPk(id);
    if (!userId) {
      throw new NotFoundException('user not found');
    } else {
      const user = await this.userModel.update(updateUserDto, {
        where: { userId: id },
      });
      return user;
    }
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id);
    if (user) {
      await user.destroy();
    }
  }
}
