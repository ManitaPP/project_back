import { Module } from '@nestjs/common';
import { ReqRecvsService } from './req-recvs.service';
import { ReqRecvsController } from './req-recvs.controller';
import { ReqRecv } from './entities/req-recv.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([ReqRecv, Request, User])],
  controllers: [ReqRecvsController],
  providers: [ReqRecvsService],
})
export class ReqRecvsModule {}
