const Redis = require('ioredis');
require('dotenv').config()

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

// Function to set a key-value pair with TTL
async function setKeyValuePairWithTTL(key, value, ttl) {
  try {
    await redis.set(key, value, 'EX', ttl);
    console.log(`Key "${key}" set to "${value} with TTL ${ttl}"`);
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

// Function to delete a given key value pair for a given key
async function deleteKeyValuePair(key) {
  try {
    await redis.del(key);
  } catch (error) {
    console.error('Error deleting key:', error);
  }
}

// Function to scan all keys with a given prefix
async function getAllKeyValuesWithPrefix(prefix) {
  const keys = [];
  let cursor = '0';

  do {
    const result = await redis.scan(cursor, 'MATCH', `${prefix}*`);
    cursor = result[0];
    keys.push(...result[1]);
  } while (cursor !== '0');

  // Fetch values for each key
  const values = await Promise.all(keys.map(key => redis.get(key)));

  // Combine keys and values into an object
  const keyValuePairs = keys.reduce((acc, key, index) => {
    acc.push({key: key, value: values[index] });
    return acc;
  }, {});

  return keyValuePairs;
}

// Function to delete all keys with a given prefix
async function removeAllKeysWithPrefix(prefix) {
  try {
    // Get all keys with the given prefix
    const keysToDelete = await redis.keys(`${prefix}*`);

    // Check if there are any keys to delete
    if (keysToDelete.length > 0) {
      // Delete all keys with the given prefix
      await redis.del(keysToDelete);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  setKeyValuePair,
  getValueForKey,
  deleteKeyValuePair,
  setKeyValuePairWithTTL,
  getAllKeyValuesWithPrefix,
  removeAllKeysWithPrefix
}


