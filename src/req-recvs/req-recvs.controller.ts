import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReqRecvsService } from './req-recvs.service';
import { CreateReqRecvDto } from './dto/create-req-recv.dto';
import { UpdateReqRecvDto } from './dto/update-req-recv.dto';

@Controller('req-recvs')
export class ReqRecvsController {
  constructor(private readonly reqRecvsService: ReqRecvsService) {}

  @Post()
  create(@Body() createReqRecvDto: CreateReqRecvDto) {
    return this.reqRecvsService.create(createReqRecvDto);
  }

  @Get()
  findAll() {
    return this.reqRecvsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reqRecvsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReqRecvDto: UpdateReqRecvDto) {
    return this.reqRecvsService.update(+id, updateReqRecvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reqRecvsService.remove(+id);
  }
}
