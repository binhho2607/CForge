const Redis = require('ioredis');
require('dotenv').config()

console.log(process.env.REDIS_URL)
const redis = new Redis(process.env.REDIS_URL);

// Function to set a key-value pair
async function setKeyValuePair(key, value) {
    try {
      await redis.set(key, value);
      console.log(`Key "${key}" set to "${value}"`);
      return true;
    } catch (error) {
      console.error('Error setting key-value pair:', error);
      return null;
    }
}

// Function to get the value for a given key
async function getValueForKey(key) {
    try {
      const value = await redis.get(key);
      console.log(`Value for key "${key}": ${value}`);
      return value;
    } catch (error) {
      console.error('Error getting value for key:', error);
      return null;
    }
}

module.exports = {
  setKeyValuePair,
  getValueForKey
}

