import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/models/user.model';
import { PositionsModule } from './positions/positions.module';
import { DepartmentsModule } from './departments/departments.module';
import { Department } from './departments/entities/department.model';
import { Position } from './positions/entities/position.model';
import { ReqRecvsModule } from './req-recvs/req-recvs.module';
import { RequestsModule } from './requests/requests.module';
import { RequestTypesModule } from './request-types/request-types.module';
import { ReqRecv } from './req-recvs/entities/req-recv.model';
import { Request } from './requests/entities/request.model';
import { RequestType } from './request-types/entities/request-type.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password123@',
      database: 'myDatabase',
      models: [User, Department, Position, ReqRecv, Request, RequestType],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PositionsModule,
    DepartmentsModule,
    ReqRecvsModule,
    RequestsModule,
    RequestTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
