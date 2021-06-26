import { User } from '../../entities/user.entity';

export const toResponse = (
  user: User
): {
  id: string;
  name: string;
  login: string;
} | null => {
  const { id, name, login } = user;
  if (id && name && login) {
    return { id, name, login };
  }
  return null;
};
