
module.exports = (app) => ({
  afisha: (url) => require('./afisha')(app, url),
  schedule: (url) => require('./shedule')(app, url),
  terminals: (url) => require('./terminals')(app, url),
});
