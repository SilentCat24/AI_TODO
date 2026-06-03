const mongoose=require('mongoose');
require("dotenv").config();

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected DB:", conn.connection.name);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
// connectDb();


module.exports=connectDb;