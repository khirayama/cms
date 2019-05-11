import * as path from 'path';

import express from 'express';

import { adminStatic, adminRouter } from 'publishment';

const app = express();

app.set('views', path.resolve('src', 'views'));
app.set('view engine', 'pug');

app.use('/admin/public', adminStatic);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listen at 3000');
});
