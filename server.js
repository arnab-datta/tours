const dotenv = require('dotenv');
// dotenv.config({ path: './config.env', override: true }); // FIRST
dotenv.config({ path: './config.env' }); // FIRST
const mongoose = require('mongoose');
const app = require('./app'); // AFTER dotenv

// production
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// local
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB)
  .then((con) => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

console.log('NODE_ENV : ', process.env.NODE_ENV);

// 4) START SERVER
const port = process.env.PORT;
app.listen(port, () => {
  // cb will be called as soon as the server start listening
  console.log(`App running at port ${port}`);
});
// TEST
