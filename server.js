const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

dotenv.config({ path: './config.env', override: false });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB Connection successful');
  })
  .catch((ex) => {
    console.log(ex);
  });
// console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log('EXPRESS ENV:', app.get('env'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // cb will be called as soon as the server start listening
  console.log(`App running at port ${port}`);
});
