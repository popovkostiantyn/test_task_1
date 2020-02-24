const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const http = require('http');
const path = require('path');
const fs = require('fs');
const routes = require('./routes');
const models = require('./models');
const customers = require('./routes/customers');
const sms = require('./routes/sms');

const app = express();
const logFileStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flag: 'a' });

app.set('port', 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(morgan('combined', {stream: logFileStream }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.delete('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.put('/customers/edit/:id', customers.save_edit);
app.get('/customers/sms/:id', sms.sms);
app.post('/customers/sms/:id', sms.sms_send);

app.use(function(req, res) {
  res.status(404).send('404: Page not found');
});

models.sequelize.sync();
http.createServer(app).listen(app.get('port'), () => {
  console.log(`Server is up on the port ${app.get('port')}`);
});