const config = {
    development: {
      db: {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        password: 'dev123',
        dbname: 'dev',
        user: 'dev',
      },
      twilio: {
        accountSid: '',
        authToken: '',
        phone: {
          from: '',
        },
      },
    },
    production: {
      db: {
        host: '',
        port: 1234,
        dialect: '',
        password: '',
        dbname: '',
        user: '',
      },
      twilio: {
        accountSid: '',
        authToken: '',
        phone: {
          from: '',
        },
      },
    },
  };
  
  module.exports = config;