import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth';
import requestRoutes from './routes/request';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Welcome to Replate API 👋🏾' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/requests', requestRoutes);

app.use((req, res, next) => {
  const error = new Error('Route Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: 'error',
    message: error.message,
  });
  next();
});

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));

export default app;
