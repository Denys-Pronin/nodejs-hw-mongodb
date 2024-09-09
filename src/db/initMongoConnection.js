import mongoose from 'mongoose';
import { env } from '../utils/env.js';
export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER'),
      pwd = env('MONGODB_PASSWORD'),
      url = env('MONGODB_URL'),
      db = env('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(`Error while setting up mongo connection`, error);
    throw error;
  }
};
