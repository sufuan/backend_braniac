import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";





async function connectDb() {

  try {
    await mongoose.connect(config.db_url as string);

    console.log('db successfull')

    app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`)
    })

  } catch (error) {
    console.log('db error', error)
  }
}

connectDb();
