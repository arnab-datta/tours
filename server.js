const dotenv = require('dotenv');
// dotenv.config({ path: './config.env', override: true }); // FIRST
dotenv.config({ path: './config.env' }); // FIRST
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, ' : ', err.message);

  process.exit(1);
});

const app = require('./app'); // AFTER dotenv

// production
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// local
const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then((con) => {
  console.log('✅ MongoDB connected');
});
// .catch((err) => console.error('❌ MongoDB connection error:', err));

console.log('NODE_ENV : ', process.env.NODE_ENV);

// 4) START SERVER
const port = process.env.PORT;
const server = app.listen(port, () => {
  // cb will be called as soon as the server start listening
  console.log(`App running at port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, ' : ', err.message);
  console.log('UNHANDLER REJECTION! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
