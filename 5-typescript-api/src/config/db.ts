import mongoose from 'mongoose';

const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION || '');
  // eslint-disable-next-line no-console
  console.log('MongoDB connected');
};

export default connectDb;
