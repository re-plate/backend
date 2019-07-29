import express from 'express';
import db from '../data/dbConfig';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const me = await db('users').insert({ username: 'bss', password: 'aa' });
  // .returning('*')
  // .toString();

  res.json({ me });
});
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
