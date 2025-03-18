import dotenv from 'dotenv'
import connectToDB from './db/dbConnect.js'
import app from './app.js'

dotenv.config({
    path: '/env'  
})

const majorNodeVersion = +process.env.NODE_VERSION?.split(".")[0] || 0;

const startServer = () => {
    // httpServer.listen(process.env.PORT || 8080, () => {
    //   console.info(
    //     `📑 Visit the documentation at: http://localhost:${
    //       process.env.PORT || 8080
    //     }`
    //   );
    //   console.log("⚙️  Server is running on port: " + process.env.PORT);
    // });
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is listening on: ${process.env.PORT}`);
    })
  };


  if (majorNodeVersion >= 14) {
    try {
      await connectToDB()
      startServer();
    } catch (err) {
      console.log("Mongo db connect error: ", err);
    }
  } else {
    connectToDB()
      .then(() => {
        startServer();
      })
      .catch((err) => {
        console.log("Mongo db connect error: ", err);
      });
  }















/**import express from 'express'
const app = express()

( async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("Error", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("Error", error);
        throw error
    }
})()
**/