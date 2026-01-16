const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// Handlers
const getAllTours = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

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

/*******************  old codes before refractoring *********************************/

// const getAllTours = async (req, res) => {
//   try {
//     // 1A) Filtering
//     const queryObj = { ...req.query };
//     const excludedFields = ['page', 'sort', 'limit', 'fields'];
//     excludedFields.forEach((el) => delete queryObj[el]);

//     // console.log(req.query, queryObj);
//     // console.log(queryObj);

//     // 1B) Advance Filtering
//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

//     // console.log(JSON.parse(queryStr));
//     let query = Tour.find(JSON.parse(queryStr));

//     // 2) SORT
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(',').join(' ');
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort('-createdAt');
//     }

//     // 3) Filed limiting
//     if (req.query.fields) {
//       const fields = req.query.fields.split(',').join(' ');
//       query = query.select(fields);
//     } else {
//       query = query.select('-__v');
//     }

//     // 4) Pagination
//     const page = req.query.page * 1 || 1;
//     const limit = req.query.limit * 1 || 100;
//     const skip = (page - 1) * limit;
//     query = query.skip(skip).limit(limit);

//     if (req.query.page) {
//       const numTours = await Tour.countDocuments();
//       if (skip >= numTours) throw new Error(`This page doesn't exist`);
//     }

//     // EXECUTE QUERY
//     const tours = await query;

//     // const tours = await Tour.find().where('duration').equals(5);

//     res.status(200).json({
//       status: 'success',
//       requestedAt: req.requestTime,
//       results: tours.length,
//       data: { tours },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'Failed',
//       message: err.message,
//     });
//   }
// };

// Handlers using updating local file
// const fs = require('fs');
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
  aliasTopTours,
  // checkID,
  // checkBody,
};
