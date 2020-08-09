import express from 'express';
import gradesRouter from './routes/grades.js';
import winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'grades-api.log' }),
  ],
  format: combine(label({ label: 'grades-api' }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());

app.use('/grades', gradesRouter);

app.listen(3000, () => {
  logger.info('grades-api started');
});
