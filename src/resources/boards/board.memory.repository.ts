import { getRepository } from 'typeorm';
import { Board } from '../../entities/board.entity';

const getAll = async ():Promise<Board[]> => (await getRepository(Board).find({ where: {} }))
  .map(Board.toResponse);

const getBoard = async (id:string):Promise<Board|null> => {
  const board = await getRepository(Board).findOne(id);
  if (board) return Board.toResponse(board);
  return null;
};

const createNewBoard = async (board:Board):Promise<Board|void> => {
  const boardRepository = getRepository(Board);
  const newUser = boardRepository.create(board);
  boardRepository.save(newUser);
  return Board.toResponse(newUser);
};

const updateBoard = async (obj:Board):Promise<Board|void> => {
  const boardRepository = getRepository(Board);
  const findedUser = await boardRepository.findOne(obj.id);
  if (!findedUser) return undefined;
  const updateData = { ...obj };
  const updatedUser = await boardRepository.update(obj.id, updateData);
  return Board.toResponse(updatedUser.raw);
};

const deleteBoard = async (id:string):Promise<boolean> => {
  const studentRepositiory = getRepository(Board);
  const deletionRes = await studentRepositiory.delete(id);
  if (deletionRes.affected) return true;
  return false;
};

export default {
  deleteBoard, updateBoard, createNewBoard, getBoard, getAll
};
