import { Board } from '../../entities/board.entity';
import boardRepo from './board.memory.repository';

export const getAll = async ():Promise<Board[]> => boardRepo.getAll();
export const getBoard = (id:string):Promise<Board|null> => boardRepo.getBoard(id);
export const createBoard = (board:Board):Promise<Board|void> => boardRepo.createNewBoard(board);
export const updateBoard = (board:Board):Promise<Board|null> => boardRepo.updateBoard(board);
export const deleteBoard = (id:string):Promise<boolean> => boardRepo.deleteBoard(id);
