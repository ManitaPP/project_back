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
      order: [[{ model: Department, as: 'department' }, 'name', 'ASC']],
    });
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id, {
      include: [
        {
          model: Position,
          required: false,
        },
        {
          model: Department,
          required: false,
        },
      ],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  async updateLeader(userId: number): Promise<any> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.update({ leaderId: null });

    await this.userModel.update(
      { leaderId: null },
      {
        where: { leaderId: userId },
      },
    );

    return user;
  }

  async findOneByEmail(email: string) {
    if (!email || typeof email !== 'string') {
      throw new BadRequestException('Invalid email provided');
    }
    const user = await this.userModel.findOne({
      where: { email: email },
      include: [
        {
          model: Position,
          as: 'position',
        },
        {
          model: Department,
          as: 'department',
        },
      ],
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
      include: [
        {
          model: Position,
          required: false,
        },
        {
          model: Department,
          required: false,
        },
      ],
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
      include: [
        {
          model: Position,
          required: false,
        },
        {
          model: Department,
          required: false,
        },
      ],
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
        include: [
          {
            model: Position,
            required: false,
          },
          {
            model: Department,
            required: false,
          },
        ],
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
          position: user.position,
          department: user.department,
          subordinates,
        });
      }

      return result;
    };

    const users = await findUsersRecursively(id);
    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userModel.update(updateUserDto, {
      where: { userId: id },
    });
    const updatedUser = await this.userModel.findByPk(id);
    if (!updatedUser) {
      throw new NotFoundException('Error retrieving updated user');
    }

    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id);
    if (user) {
      await user.destroy();
    }
  }
}
