import mongoose from 'mongoose';

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION || '');
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default db;
