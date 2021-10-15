const mongoose = require('mongoose');

module.exports.connect = () => {
    return new Promise((resolve, reject) => {
  
      if (process.env.NODE_ENV === 'test') {
        const Mockgoose = require('mockgoose').Mockgoose;
        const mockgoose = new Mockgoose(mongoose);
  
        mockgoose.prepareStorage()
          .then(() => {
            mongoose.connect(process.env.DB_CONNECT,
              { useNewUrlParser: true})
              .then((res, err) => {
                if (err) return reject(err);
                console.log('Database ready for testing');
                resolve();
              })
          })
      } else {
          mongoose.connect(process.env.DB_CONNECT,
            { useNewUrlParser: true})
            .then((res, err) => {
              if (err) return reject(err);
              console.log('Database connection successful');
              resolve();
            })
      }
    });
  }
  
module.exports.close = () => {
  return mongoose.disconnect();
}


  