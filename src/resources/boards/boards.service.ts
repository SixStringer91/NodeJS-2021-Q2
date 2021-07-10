import { Board } from './entities/board.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>
  ) {}
  async findAll() {
    const boards = await this.boardsRepository.find({ where: {} });
    return boards.map(Board.toResponse);
  }

  async create(board: Board) {
    const newUser = this.boardsRepository.create(board);
    const createdBoard = await this.boardsRepository.save(newUser);
    return Board.toResponse(createdBoard);
  }

  async findOne(id: string) {
    const board = await this.boardsRepository.findOne(id);
    if (board) return Board.toResponse(board);
    return null;
  }

  async update(obj) {
    const findedTask = await this.boardsRepository.findOne(obj.id);
    if (!findedTask) return null;
    const reducedData = { ...findedTask, ...obj };
    const updatedBoard = await this.boardsRepository.update(
      obj.id,
      reducedData
    );
    if (updatedBoard.affected) return Board.toResponse(reducedData);
    return null;
  }

  async remove(id: string) {
    const deletionRes = await this.boardsRepository.delete(id);
    if (deletionRes.affected) return true;
    return false;
  }
}
