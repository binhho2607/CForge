const Redis = require('ioredis');
require('dotenv').config()

const redis = new Redis(process.env.REDIS_URL);

// Function to set a key-value pair
async function setKeyValuePair(key, value) {
    try {
      await redis.set(key, value);
      console.log(`Key "${key}" set to "${value}"`);
    } catch (error) {
      console.error('Error setting key-value pair:', error);
    }
}

// Function to get the value for a given key
async function getValueForKey(key) {
    try {
      const value = await redis.get(key);
      console.log(`Value for key "${key}": ${value}`);
    } catch (error) {
      console.error('Error getting value for key:', error);
    }
}


