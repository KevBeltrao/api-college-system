import mongoose from 'mongoose';

export default () => {
  mongoose.connect(process.env.MONGO_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  mongoose.connection.once('open', () => {
    // eslint-disable-next-line no-console
    console.log('Connected to database');
  });
};
