const dotenv = require('dotenv');
dotenv.config({ path: './config.env', override: false });

const app = require('./app');

// console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log('EXPRESS ENV:', app.get('env'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // cb will be called as soon as the server start listening
  console.log(`App running at port ${port}`);
});
