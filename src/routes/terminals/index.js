const {
    getAllTerminals
} = require('../../controllers/terminal.controller');

module.exports = (app, url, ...args) => {
    app.get(`${url}/all`, ...args, getAllTerminals);
};
