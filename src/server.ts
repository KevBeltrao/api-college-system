import app from '@config/app';
import logger from '@config/logger';

app.listen(process.env.PORT, () => {
  logger.log('info', `Server running on port ${process.env.PORT}`);
});
