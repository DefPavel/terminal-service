const Redis = require('ioredis');
require('dotenv').config();

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

// Get data
const getRedisAsync = async (arg) => redis.get(arg);
// Set new data
const setRedisAsync = async (key, arg) => redis.set(key, arg);
// Exist key
const existRedisKeyAsync = async (key) => redis.exists(key);
// Set new data with expire
const setXRedisAsync = async (key, arg, exp) => redis.setex(key, parseInt(exp), arg);
// Update expire
const expireRedisAsync = async (key, exp) => redis.expire(key, parseInt(exp));
// Delete key
const delRedisAsync = async (key) => redis.del(key);
// Get keys by pattern
const keysRedisAsync = async (pattern) => redis.keys(pattern);
// lPush list
const lPushRedisAsync = async (key, arg) => redis.lpush(key, arg);
// hset
const hSetRedisAsync = async (...args) => redis.hset(...args);
// hsetnx
const hSetNxRedisAsync = async (...args) => redis.hsetnx(...args);
// hexists
const hExistsRedisAsync = async (...args) => redis.hexists(...args);
// hget
const hGetRedisAsync = async (...args) => redis.hget(...args);
// hdel
const hDelRedisAsync = async (...args) => redis.hdel(...args);

module.exports = {
  getRedisAsync,
  setRedisAsync,
  delRedisAsync,
  setXRedisAsync,
  expireRedisAsync,
  keysRedisAsync,
  lPushRedisAsync,
  hSetRedisAsync,
  hSetNxRedisAsync,
  hExistsRedisAsync,
  hGetRedisAsync,
  hDelRedisAsync,
  existRedisKeyAsync,
};