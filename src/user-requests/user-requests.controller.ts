import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserRequestsService } from './user-requests.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user-requests')
export class UserRequestsController {
  constructor(private readonly userRequestsService: UserRequestsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Interceptor สำหรับจัดการไฟล์
  async create(
    @Body() createUserRequestDto: CreateUserRequestDto,
    @UploadedFile() file: Express.Multer.File, // ใช้สำหรับรับไฟล์
  ) {
    if (file) {
      console.log('File uploaded:', file.originalname);
      createUserRequestDto.file = file.filename;
    }
    return this.userRequestsService.create(createUserRequestDto);
  }

  @Get()
  findAll() {
    return this.userRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ) {
    return this.userRequestsService.update(+id, updateUserRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRequestsService.remove(+id);
  }
}
