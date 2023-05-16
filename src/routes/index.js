
const CheckToken = require("../middlewares/auth.middleware");

module.exports = (app) => ({
  afisha: (url) => require('./afisha')(app, url, CheckToken),
  schedule: (url) => require('./shedule')(app, url, CheckToken),
  terminals: (url) => require('./terminals')(app, url, CheckToken),
});
