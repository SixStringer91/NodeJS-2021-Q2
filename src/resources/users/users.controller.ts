import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: User) {
    const newUser = await this.usersService.createUser(body);
    if (newUser) {
      return newUser;
    }
  }

  @Get()
  async findAll() {
    const users = await this.usersService.getAll();
    if (users) {
      return users;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = this.usersService.getUser(id);
    if (user) {
      return user;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: User) {
    const newBoard = await this.usersService.updateUser({
      ...body,
      id
    });
    if (newBoard) {
      return newBoard;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const userFinded = await this.usersService.deleteUser(id);
    if (userFinded) {
      // await ifUserDeleted(userId);
      return 'The board has been deleted';
    }
  }
}
