import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/models/user.model';
import { VillagesModule } from './villages/villages.module';
import { Village } from './villages/entities/village.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password123@',
      database: 'myDatabase',
      models: [User, Village],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    VillagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
