import { Module } from '@nestjs/common';
import { ReqRecvsService } from './req-recvs.service';
import { ReqRecvsController } from './req-recvs.controller';
import { ReqRecv } from './entities/req-recv.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { UserRequest } from 'src/user-requests/entities/user-request.model';

@Module({
  imports: [SequelizeModule.forFeature([ReqRecv, User, UserRequest])],
  controllers: [ReqRecvsController],
  providers: [ReqRecvsService],
})
export class ReqRecvsModule {}
