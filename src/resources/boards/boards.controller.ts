import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { Board } from './entities/board.entity';
import { BoardsService } from './boards.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async findAll() {
    const boards = await this.boardsService.findAll();
    if (boards) {
      return boards;
    }
    throw new HttpException('Boards not found', HttpStatus.NOT_FOUND);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const board = await this.boardsService.findOne(id);
    if (board) {
      return board;
    }
    throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  async create(@Body() body: Board) {
    const newBoard = await this.boardsService.create({ ...body });
    if (newBoard) {
      return newBoard;
    }
    throw new HttpException('board not created', HttpStatus.BAD_REQUEST);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Body) {
    const newBoard = await this.boardsService.update({
      ...body,
      id
    });
    if (newBoard) {
      return newBoard;
    }
    throw new HttpException('board not found', HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const boardFinded = await this.boardsService.remove(id);
    if (boardFinded) {
      return 'The board has been deleted';
    }
    throw new HttpException('board not found', HttpStatus.BAD_REQUEST);
  }
}
