const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:5c5459b4f3754f3396ddb966b263f26e@localhost:5432/WorkoutLog");

module.exports = sequelize;