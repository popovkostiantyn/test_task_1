# 0. Description:
  * Create a person with name and phone number as parameters;
  * List all people;
  * Edit-delete person;
  * Send sms;

# 1. Prerequisites for running locally:
  * mysql installed (+ created a schema)
  * node js installed (v.9.2.1)
  * npm installed (5.5.1)

# 2. Edit config.js file with your parameters:
      development: {
        db: {
          host: 'dbHost',
          port: dbPort,
          dialect: 'mysql',
          password: 'dbPassword',
          dbname: 'dbName', (the one that was created in Prerequisites step)
          user: 'dbUser',
        },
        twilio: {
          accountSid: 'twilio.accountSid',
          authToken: 'twilio.authToken',
          phone: {
            from: 'twilio.number',
          },
        },
      },
      
# 3. Run the application:
```sh
$ npm install
```
```sh
$ npm start
```
# 4. Request examples:
* GET /customers - return list of customers;
* POST /customers/add?name=${name}&phone=${phone_number} - add a customer;
* PUT /customers/edit/${id}?name=${name}&phone=${phone_number} - edit a customer;
* DELETE /customers/edit/${id} - delete a customer;
