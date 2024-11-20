import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Department } from 'src/departments/entities/department.model';
import { Position } from 'src/positions/entities/position.model';
import { DepartmentsModule } from 'src/departments/departments.module';
import { PositionsModule } from 'src/positions/positions.module';

@Module({
  imports: [
    DepartmentsModule,
    PositionsModule,
    SequelizeModule.forFeature([User, Department, Position]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
