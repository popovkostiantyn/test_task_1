const models = require('../models');
const config = require('../config');
const twilio = require('twilio');

exports.sms = function (req, res) {
  const customerId = req.params.id;
  return res.render('sms', { page_title: 'Send sms', data: customerId });
};

exports.sms_send = async function (req, res) {
  const input = JSON.parse(JSON.stringify(req.body));
  const customerId = req.params.id;
  let sms = '';
  if (JSON.stringify(input) === '{}') {
    // request comes not from UI (postman, another application, etc.)
    sms = req.query.sms;
  } else {
    // request comes from UI
    sms = input.sms;
  }
  const receiverPhone = await models.Phone.findAll({
    attributes: ['number'],
    where: {
      id: customerId,
    },
    include: {
      attributes: ['name'],
      model: models.Person,
    },
  }).catch((err) => {
    console.log(`Could not fetch receiver's data from database. Error: ${err}`);
  });
  const accountSid = config.development.twilio.accountSid;
  const authToken = config.development.twilio.authToken;
  const client = twilio(accountSid, authToken);
  const message = await client.messages.create({
    body: `Hello, ${receiverPhone[0].Person.name}, your message: ${sms}`,
    to: `+${receiverPhone[0].number}`,
    from: `${config.development.twilio.phone.from}`,
  }).catch((err) => {
    console.log(`Message was not created. Error: ${err}`);
  });
  try {
    await process.stdout.write(message.sid);
  } catch (err) {
    console.log(`SMS was not sent. Error: ${err}`);
  }
  return res.redirect('/customers');
};