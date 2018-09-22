export default (app) => {

    app.get('/', (req, res, next) => {
      res.sendFile(__dirname + '/../../build/index.html');
    });
    
    require('./reposts').default(app);
    require('./config').default(app);
  }
  