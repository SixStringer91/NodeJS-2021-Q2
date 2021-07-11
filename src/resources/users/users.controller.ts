import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUserToRes, User } from './entities/user.entity';
import { AuthGuard } from '../login/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: User): Promise<IUserToRes | void> {
    const newUser = await this.usersService.createUser(body);
    if (newUser) {
      return newUser;
    }
  }

  @Get()
  async findAll(): Promise<Omit<User, 'password'>[] | void> {
    const users = await this.usersService.getAll();
    if (users) {
      return users;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IUserToRes | void> {
    const user = this.usersService.getUser(id);
    if (user) {
      return user;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: User
  ): Promise<IUserToRes | void> {
    const newBoard = await this.usersService.updateUser({
      ...body,
      id
    });
    if (newBoard) {
      return newBoard;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string | void> {
    const userFinded = await this.usersService.deleteUser(id);
    if (userFinded) {
      // await ifUserDeleted(userId);
      return 'The board has been deleted';
    }
  }
}
