const configTerminal = require('../../knexfile.js').terminal;

module.exports = {
  knexConnection: require('knex')(configTerminal),
};
