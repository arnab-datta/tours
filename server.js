const dotenv = require('dotenv');
dotenv.config({ path: './config.env', override: false }); // FIRST

const mongoose = require('mongoose');

const app = require('./app'); // AFTER dotenv

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB)
  .then((con) => {
    console.log('✅ MongoDB Atlas connected');
    console.log(con.connections);
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: { type: number, default: 4.5 },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.Model('Tour', tourSchema);

// console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log('EXPRESS ENV:', app.get('env'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // cb will be called as soon as the server start listening
  console.log(`App running at port ${port}`);
});
