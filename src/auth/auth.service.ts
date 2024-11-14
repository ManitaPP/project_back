/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; user: any }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }
  registerUser = async (createUserDto: CreateUserDto) => {
    console.log('user', createUserDto);
    if (
      !createUserDto.thaiId ||
      !createUserDto.name ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new BadRequestException('Missing required fields');
    }
    const email = await this.usersService.findOneByEmail(createUserDto.email);
    if (email) {
      throw new BadRequestException('มีอีเมลนี้อยู๋ในระบบแล้ว');
    }
    const thaiId = await this.usersService.findOneByThaiId(
      createUserDto.thaiId,
    );
    if (thaiId) {
      throw new BadRequestException('รหัสบัตรประชาชนนี้มีอยู๋ในระบบแล้ว');
    }
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    const user = await this.userModel.create({
      thaiId: createUserDto.thaiId,
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      role: 'user',
    });
    console.log(user);
    return user;
  };

  registerAdmin = async (createUserDto: CreateUserDto) => {
    const email = await this.usersService.findOneByEmail(createUserDto.email);
    if (email) {
      throw new BadRequestException('มีอีเมลนี้อยู๋ในระบบแล้ว');
    }
    const thaiId = await this.usersService.findOneByThaiId(
      createUserDto.thaiId,
    );
    if (thaiId) {
      throw new BadRequestException('รหัสบัตรประชาชนนี้มีอยู๋ในระบบแล้ว');
    }
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    const user = await this.userModel.create({
      thaiId: createUserDto.thaiId,
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      role: 'admin',
    });
    return user;
  };
}
