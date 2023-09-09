import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://lightningdeath2014:bCzaj5f92DyiuIQQ@cluster0.fxdmwx5.mongodb.net/usuariosmern?retryWrites=true&w=majority"
    );
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};

//export default connectDb;
