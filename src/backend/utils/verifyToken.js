const { getValueForKey, setKeyValuePairWithTTL } = require('../redis/redis');
const bcrypt = require('bcrypt');
const { db } = require('../postgresql/index');
const { v4: uuidv4 } = require('uuid');

const verifyToken = async (projectId, projectToken, secretToken) => {
    const storedToken = await getValueForKey(projectId);
    // only hit postgres when secret token is out of TTL or first time access
    if(storedToken === null || secretToken === "") {
        const projectQuery = db.Project.findOne({
            where: {
                projectId: projectId
            }
        });
        if(projectQuery === null){
            return "NOT FOUND";
        }
        const verifyProjectToken = await bcrypt.compare(projectToken, projectQuery.projectToken);
        if(verifyProjectToken){
            const newSecretToken = uuidv4(); 
            const salt = await bcrypt.genSalt(10);
            const hashedNewSecretToken = await bcrypt.hash(newSecretToken, salt);
            // token is valid of 1 hour (3600 seconds)
            await setKeyValuePairWithTTL(projectId, newSecretToken, 3600);
            return hashedNewSecretToken;
        }else{
            return "INVALID";
        }
    } else {
        const match = await bcrypt.compare(secretToken, storedToken);
        if(match){
            return "VALID";
        } else {
            return "INVALID";
        }
    }
    
}

module.exports = {
    verifyToken
}