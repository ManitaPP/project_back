import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Village } from 'src/villages/entities/village.model';
import { VillagesModule } from 'src/villages/villages.module';

@Module({
  imports: [VillagesModule, SequelizeModule.forFeature([User, Village])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
