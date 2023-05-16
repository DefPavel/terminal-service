const {
    setXRedisAsync,
    setRedisAsync,
    delRedisAsync,
    getRedisAsync,
    keysRedisAsync,
  } = require('../../database/redisConnection');
  const baseKey = 'sessions:user_';
  
  // ! Changed
  // Set new session with lifetime, default 30 min
  module.exports.setNewSessionExpire = async (idUser, token, sessionObj, expiredTime = 10) =>
    setXRedisAsync(`${baseKey}${idUser}:${token}`, JSON.stringify(sessionObj), expiredTime);
  
  // Set new session without lifetime
  module.exports.setNewSession = async (idUser, token, sessionObj) =>
    setRedisAsync(`${baseKey}${idUser}:${token}`, JSON.stringify(sessionObj));
  
  // Delete session
  module.exports.deleteSession = async (idUser, token) =>
    delRedisAsync(`${baseKey}${idUser}:${token}`);
  
  // Get session info
  module.exports.getSession = async (idUser, token) => getRedisAsync(`${baseKey}${idUser}:${token}`);
  
  // Get session by key
  module.exports.getByKey = async (key) => JSON.parse(await getRedisAsync(key));
  
  // Get all sessions
  module.exports.getAllSessions = async () => keysRedisAsync('sessions*');