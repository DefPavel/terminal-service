const MicroMQ = require('micromq');
const router = require('./src/routes');
const baseurl = '/api/terminal';
require('dotenv').config();

const app = new MicroMQ({
  name: 'terminal',
  rabbit: {
    url: process.env.RABBIT_URL,
  },
});

const { afisha: afishaApi, schedule: scheduleApi, terminals: terminalApi } = router(app);

// Api routes
afishaApi(`${baseurl}/afisha`);
scheduleApi(`${baseurl}/schedule`);
terminalApi(`${baseurl}/terminals`);
// Start app
app.start().then();
