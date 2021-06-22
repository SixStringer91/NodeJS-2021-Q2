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
  const createdBoard = await boardRepository.save(newUser);
  return Board.toResponse(createdBoard);
};

const updateBoard = async (obj:Board):Promise<Board|null> => {
  const boardRepository = getRepository(Board);
  const findedTask = await boardRepository.findOne(obj.id);
  if (!findedTask) return null;
  const reducedData = { ...findedTask, ...obj };
  const updatedBoard = await boardRepository.update(obj.id, reducedData);
  if (updatedBoard.affected) return Board.toResponse(reducedData);
  return null;
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
