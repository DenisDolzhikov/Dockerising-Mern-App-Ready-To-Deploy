require('dotenv').config();
import cookieParser from "cookie-parser";
import path from 'path';
import express, { NextFunction, Request, Response} from 'express';
import morgan from "morgan";
import config from 'config';
process.env['NODE_CONFIG_DIR'] = path.join(path.resolve('./'),'config/');
import cors from 'cors';
import { HttpError } from 'http-errors';
import connectDB from "./utils/connectDB";
import goodsRouter from "./routes/goods.route";


/**
 * 
 * Тест отправки писем через фейковый почтовый SMTP-сервис
 */
// import nodemailer from 'nodemailer';
// (async function() {
//   const credentials = await nodemailer.createTestAccount();
//   console.log(credentials);
// })();


const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use('/api/static', express.static(path.join(__dirname, '../public')));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://147.45.175.126',
      'http://denisdolzhikovtest.ru',
      'https://denisdolzhikovtest.ru',
    ],
  })
);

app.use('/api/goods', goodsRouter);

app.get(
  '/api/healthChecker',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to Denis Dolzhikov server!',
    });
  }
);

// Неизвестные роуты
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  // const err = new Error(`Route ${req.originalUrl} not found`) as any;
  const err = new HttpError(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});


// Глобальный обработчик ошибок
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const PORT = config.get<number>('port');
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
  connectDB();
});

/**
 * 
 * Заполняем БД начальными данными
 * 
 */

import { Good } from "./models/good.model";
import { initialGoods } from "./data/initialData";
Good.insertMany(initialGoods);