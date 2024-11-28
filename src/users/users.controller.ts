import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './models/user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get('/search/:query')
  searchUsers(@Param('query') query: string) {
    return this.usersService.searchUsers(query);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/findAll')
  findAllDelete() {
    return this.usersService.findAllD();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @Get('priority/:priority')
  async getUsersByPriority(
    @Param('priority') priority: string,
  ): Promise<User[]> {
    const priorityNumber = parseInt(priority, 10);
    if (isNaN(priorityNumber)) {
      throw new BadRequestException('Invalid priority value');
    }
    return this.usersService.findUsersByPriority(priorityNumber);
  }

  @Get('/name/:id')
  findOneByName(@Param('id') name: string) {
    return this.usersService.findOneByName(name);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.User, Role.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Post(':id/restore')
  async restoreUser(@Param('id') id: number) {
    return this.usersService.restore(+id);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('/login/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Get('/loginThai/:thaiId')
  findOneByThaiId(@Param('thaiId') thaiId: string) {
    return this.usersService.findOneByThaiId(thaiId);
  }
  @Get('/leader/:leaderId')
  findByLeader(@Param('leaderId') leaderId: number) {
    return this.usersService.findByLeader(leaderId);
  }
  @Get('/position/:leaderId')
  findPositionByLeaderId(@Param('leaderId') leaderId: number) {
    return this.usersService.findPositionByLeaderId(leaderId);
  }

  @Patch('/updateLeader/:userId')
  updateLeader(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.updateLeader(userId);
  }
}
