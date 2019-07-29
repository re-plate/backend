import express from 'express';

import authRoutes from './routes/auth';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Welcome to Replate API 👋🏾' });
});

app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
