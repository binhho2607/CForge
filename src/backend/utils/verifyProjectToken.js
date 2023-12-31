const { getValueForKey, setKeyValuePairWithTTL } = require('../redis/redis');
const bcrypt = require('bcrypt');
const { db } = require('./../postgresql/index');

const verifyProjectToken = async (projectId, projectToken, secretToken) => {
    const storedToken = await getValueForKey(projectId);
    if(storedToken === null) {
        // TODO: create a new token, send one copy back and send one copy (hashed and salted) to redis
        // verify projectToken first
    }
    const match = await bcrypt.compare(secretToken, storedToken);
    if(match){
        return "VALID";
    } else {
        return "INVALID";
    }
}

module.exports = {
    verifyProjectToken
}