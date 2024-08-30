import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://quangnam130520:root@cluster0.fwoaemp.mongodb.net/inventory?retryWrites=true&w=majority&appName=Cluster0", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1)
  }
}

export default connectDB;