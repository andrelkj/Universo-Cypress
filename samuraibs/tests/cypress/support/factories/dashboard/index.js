import _ from 'underscore';

// creating javascript objects instead of fixtures allows you to interact with the values 
// and even use faker to generate random data, underscore to manage arrays and so on
exports.customer = {
  name: 'Customer User',
  email: 'customer@test.com',
  password: 'pwd123',
  is_provider: false,
};

exports.provider = {
  name: 'Provider User',
  email: 'provider@test.com',
  password: 'pwd123',
  is_provider: true,
};

exports.appointment = {
  hour: _.sample([
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ]),
};
