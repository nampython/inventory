import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

export default connectDB;