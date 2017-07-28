const Sequelize = require('sequelize');

const sequelize = new Sequelize('event', null, null, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './events.sqlite'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
