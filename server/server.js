const dotenv = require('dotenv');
const pool = require('./utils/pool');
const app = require('./app');
dotenv.config({ path: './config.env' });

pool
  .connect({
    host: process.env.DATABASE_HOST,
    post: process.env.DATABASE_PORT,
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: '',
  })
  .then(() => {
    console.log('Database Connected');
    const port = process.env.PORT || 3002;
    const server = app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
