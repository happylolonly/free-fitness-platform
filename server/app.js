import express from 'express';
import mongoose from 'mongoose';
import configEvn from './configs/config.env';
import config from './configs/config';
import path from 'path';

import { init } from './helpers/vk';

const app = express();

const port = process.env.PORT || configEvn.port;

require('./helpers/db').default(mongoose);

require('./middlewares').default(app, express);
require('./routes').default(app);

require('./helpers/bot').default(app);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
  console.log('Server ready on:', port);
});

// init(config);
