const Sequelize = require('sequelize');
const Console = console;

const sequelize = new Sequelize('event', null, null, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './events.sqlite'
});

sequelize
  .authenticate()
  .then(() => {
    Console.log('Database connection established successfully.');
  })
  .catch(err => {
    Console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
