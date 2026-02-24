import mongoose from "mongoose";

const mongodb_uri =
  "mongodb+srv://dani:RmCCU0Wfh1utAV1F@cluster0.lfr0tyx.mongodb.net/tienda?appName=Cluster0";

const dbConnect = async () => {
  try {
    await mongoose.connect(mongodb_uri);
    console.log("Base de datos conectada");
  } catch (error) {
    console.error(error);
  }
};

export default dbConnect;
