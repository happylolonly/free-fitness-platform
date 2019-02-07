import config from '../configs/config.env';

export default (mongoose, callback) => {
  mongoose.Promise = global.Promise;

  mongoose.connect(config.db.url);
  mongoose.connection
    .once('open', () => {
      console.log('ready');
      //  callback();
    })
    .on('error', error => {
      console.log('Db connect error: \n', error);
    });
};
