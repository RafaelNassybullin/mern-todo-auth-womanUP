import dotenv from 'dotenv';
import express, { Response, Request, NextFunction, Express } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routers";
import { MONGO_OPTIONS } from "./config";
import errorMiddleware from "./middlewares/error-middleware";
import cors from 'cors';
import { uploadMiddleware } from './middlewares/upload-middleware';

dotenv.config();

const PORT = process.env["PORT"] || 1337;
const DB_URL = process.env["DB_URL"] || "mongodb+srv://rafael:rafael@cluster0.ksvub.mongodb.net/?retryWrites=true&w=majority";

const app: Express = express();

function customHeaders(_: Request, res: Response, next: NextFunction) {
  app.disable("x-powered-by");
  //у нас теперь апачи 1996
  res.setHeader("X-Powered-By", "Apache 1996");
  next();
}

//раздаем статику
app.use(express.static('public'));
//скрываем node.js express
app.use(customHeaders);
//экпресс работает с json
app.use(express.json());
//работа с http кукис
app.use(cookieParser());
//защита корс на клиент
app.use(cors<Request>({ credentials: true, origin: "http://localhost:3000" }));
//мидлвар загрузчика multer
app.use(uploadMiddleware)
//мидлвар апи роутера
app.use("/api", router);
//мидлвар ошибок
app.use(errorMiddleware);

//стартуем!
const start = async () => {
  try {
    await mongoose.connect(DB_URL, MONGO_OPTIONS);
    app.listen(PORT, () =>
      console.log("DEV SERVER IS SUCCESSFULLY STARTED :)")
    );
  } catch (e) {
    console.log(e);
  }
};

start();
