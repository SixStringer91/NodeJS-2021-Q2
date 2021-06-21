import { PORT } from './common/config';
import app from './app';
import { tryBDConnect } from './helpers/db';

tryBDConnect(() => {
  app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
});
