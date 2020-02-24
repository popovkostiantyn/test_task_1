const models = require('../models');

exports.list = async function (req, res) {
  const rows = await models.Person.findAll({
    attributes: ['name', 'id'],
    include: {
      attributes: ['number'],
      model: models.Phone,
      required: true,
    },
  }).catch((err) => {
    console.log(`Could not fetch the data from database. Error: ${err}`);
    return res.render('customer');
  });
  return res.render('customers', { page_title: 'Customers', data: rows });
};

exports.add = function (req, res) {
  return res.render('add_customer', { page_title: 'Add Customers' });
};

exports.edit = async function (req, res) {
  const customerId = req.params.id;
  const rows = await models.Person.findAll({
    attributes: ['name', 'id'],
    where: {
      id: customerId,
    },
    include: {
      attributes: ['number'],
      model: models.Phone,
      required: true,
    },
  }).catch((err) => {
    console.log(`Could not find the element. Error: ${err}`);
    return res.render('edit_customer');
  });
  return res.render('edit_customer', { page_title: 'Edit Customers', data: rows });
};

exports.save = async function (req, res) {
  const input = JSON.parse(JSON.stringify(req.body));
  let phone = '';
  let name = '';
  if (JSON.stringify(input) === '{}') {
    // request comes not from UI (postman, another application, etc.)
    phone = req.query.phone;
    name = req.query.name;
  } else {
    // request comes from UI
    phone = input.phone;
    name = input.name;
  }
  try {
    const user = await models.Phone.create({
      number: phone,
    });
    const person = await models.Person.create({
      name,
    });
    await user.setPerson(person);
  } catch (err) {
    console.log(`Data was not saved. Error: ${err}`);
  }
  return res.redirect('/customers');
};

exports.save_edit = async function (req, res) {
  const input = JSON.parse(JSON.stringify(req.body));
  const customerId = req.params.id;
  let phone = '';
  let name = '';
  if (JSON.stringify(input) === '{}') {
    // request comes not from UI (postman, another application, etc.)
    phone = req.query.phone;
    name = req.query.name;
  } else {
    // request comes from UI
    phone = input.phone;
    name = input.name;
  }
  try {
    await models.Phone.update(
      {
        number: phone,
      },
      {
        where: {
          id: customerId,
        },
      },
    );
    await models.Person.update(
      {
        name,
      },
      {
        where: {
          id: customerId,
        },
      },
    );
  } catch (err) {
    console.log(`Data was not updated. Error: ${err}`);
  }
  return res.redirect('/customers');
};

exports.delete_customer = async function (req, res) {
  const customerId = req.params.id;
  try {
    await models.Phone.destroy({
      where: {
        id: customerId,
      },
    });
    await models.Person.destroy({
      where: {
        id: customerId,
      },
    });
  } catch (err) {
    console.log(`Customer was not deleted. Error: ${err}`);
  }
  return res.redirect('/customers');
};
