import { Module } from '@nestjs/common';
import { UserRequestsService } from './user-requests.service';
import { UserRequestsController } from './user-requests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestType } from 'src/request-types/entities/request-type.model';
import { UserRequest } from './entities/user-request.model';
import { User } from 'src/users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([UserRequest, RequestType, User])],
  controllers: [UserRequestsController],
  providers: [UserRequestsService],
})
export class UserRequestsModule {}
