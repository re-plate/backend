import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
