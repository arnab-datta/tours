const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env', override: true }); // FIRST
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB)
  .then((con) => {
    console.log('✅ MongoDB connected dev');
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
