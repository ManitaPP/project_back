import { Module } from '@nestjs/common';
import { VillagesService } from './villages.service';
import { VillagesController } from './villages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Village } from './entities/village.model';

@Module({
  imports: [SequelizeModule.forFeature([Village])],
  controllers: [VillagesController],
  providers: [VillagesService],
})
export class VillagesModule {}
