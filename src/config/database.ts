import mongoose from 'mongoose';

import logger from './logger';

export default () => {
  mongoose.connect(process.env.MONGO_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  mongoose.connection.once('open', () => {
    logger.log('info', 'Database connected');
  });
};
