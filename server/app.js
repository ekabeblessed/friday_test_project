const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use('/api/users', userRouter);
module.exports = app;
