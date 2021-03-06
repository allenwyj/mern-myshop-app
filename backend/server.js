import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
  // brining morgan - logging any request into the server
  app.use(morgan('dev'));

  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// allows to set json data in the body
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// __dirname in nodejs points to the current directory
// this can be used in es module if we do it in this way.
const __dirname = path.resolve();
// making /uploads folder as a static folder, which cannot be accessed from the browser.
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  // making /frontend as a static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // any routes are not those api url, will point to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
}

// req can't match any api's url above:
// having 404 error, and passing the error msg into the next middleware.
app.use(notFound);

// Error handlers: error-handling middleware defining last
// means it connect to the api but it throws an error from inside.
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
