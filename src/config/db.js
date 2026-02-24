import mongoose from "mongoose";

const mongodb_uri =
  "TU DBURI";

const dbConnect = async () => {
  try {
    await mongoose.connect(mongodb_uri);
    console.log("Base de datos conectada");
  } catch (error) {
    console.error(error);
  }
};

export default dbConnect;
