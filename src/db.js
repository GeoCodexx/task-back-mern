import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT_URI);
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};

//export default connectDb;
