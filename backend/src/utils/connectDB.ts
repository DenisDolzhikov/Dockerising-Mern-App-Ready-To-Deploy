import mongoose from "mongoose";
import config from 'config';

const dbUrl = config.get<string>("dbUrl");

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Mongodb connected...');
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;