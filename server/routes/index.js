export default app => {
  require('./reposts').default(app);
  require('./config').default(app);
};
