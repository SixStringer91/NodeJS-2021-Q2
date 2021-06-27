import { PORT } from './common/config';
import app from './app';
import { tryBDConnect } from './helpers/db';
import { createUserAdmin } from './middlewares/admin.creator';

tryBDConnect(() => {
  createUserAdmin();
  app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
});
