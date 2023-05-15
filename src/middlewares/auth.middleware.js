const JWT = require('../utils/JWT');
const moment = require('moment');
const { errorHandler } = require('../utils/errorHandler');
const { setNewSessionExpire, getSession } = require('../models/redis/session-redis.model');
const jwt = new JWT();

const CheckToken = async function (req, res, next) {
  try {
    if (req?.headers['auth-token']) {
      const token = req?.headers['auth-token'];

      console.log(token);

      if (jwt.CheckJWT(token)) {
        const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const { id_user: idUser } = jwt.getPayload(token);
        let session = await getSession(idUser, token);

        console.log(session);

        if (session) {
          session = JSON.parse(session);

          await setNewSessionExpire(idUser, token, { ...session, timestamp: dateTime });

          next();
        } else throw errorHandler('session is not active', 419);
      } else throw errorHandler('token is not valid', 419);
    } else throw errorHandler('token not found', 401);
  } catch (e) {
    const error = !e.code ? errorHandler(e, 401) : e;
    res.status(error.code).json(error.message);
  }
};

module.exports = CheckToken;