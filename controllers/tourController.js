const fs = require('fs');
const Tour = require('./../models/tourModel');

// Handlers
const getAllTours = async (req, res) => {
  try {
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // console.log(req.query, queryObj);
    console.log(queryObj);

    // 2) Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    console.log(JSON.parse(queryStr));

    const query = Tour.find(JSON.parse(queryStr));
    const tours = await query;
    // const tours = await Tour.find().where('duration').equals(5);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message,
    });
  }
};
const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // const tour = await Tour.findOne(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message,
    });
  }
};
const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message,
    });
  }
};
const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'updated tour',
      data: {
        tour: { tour },
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message,
    });
  }
};
const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      message: 'deleted tour',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message,
    });
  }
};

// Handlers using updating local file

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// Error Handling Middlewares
// const checkID = (req, res, next, val) => {
//   console.log(`ID: ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'failed',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// const checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: 'failed',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

// const getAllTours = (req, res) => {
//   console.log(req.requestTime);
//   res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     results: tours.length,
//     data: { tours },
//   });
// };
// const getTour = (req, res) => {
//   const id = req.params.id * 1;
//   const tour = tours.find((t) => t.id === id);

//   res.status(200).json({
//     status: 'success',
//     data: { tour },
//   });
// };
// const createTour = (req, res) => {
//   const newTourId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newTourId }, req.body);
//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );
// };
// const updateTour = (req, res) => {
//   const id = req.params.id * 1;
//   const tour = tours.find((t) => t.id === id);

//   tour.name = req.body.name;
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(200).json({
//         status: 'success',
//         message: 'updated tour',
//         data: { tour },
//       });
//     }
//   );
// };
// const deleteTour = (req, res) => {
//   const id = req.params.id * 1;
//   const tour = tours.find((t) => t.id === id);

//   const udpatedTours = tours.filter((t) => t.id !== id);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(udpatedTours),
//     (err) => {
//       res.status(204).json({
//         status: 'success',
//         message: 'deleted tour',
//         data: null,
//       });
//     }
//   );
// };

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  // checkID,
  // checkBody,
};
