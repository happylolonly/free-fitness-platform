import express from 'express';
import mongoose from 'mongoose';
import configEvn from './configs/config.env';
import config from './configs/config';


import { init } from './helpers/vk';

const app = express();

const port = process.env.PORT || configEvn.port;

require('./helpers/db').default(mongoose);

require('./middlewares').default(app, express);
require('./routes').default(app);


app.listen(port, () => {
  console.log('Server ready on:', port);
});

init(config);
