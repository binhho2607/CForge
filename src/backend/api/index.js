require('dotenv').config()

module.exports = (server) => {
    require(`./${process.env.API_VERSION}/getService`)(server);
    require(`./${process.env.API_VERSION}/setService`)(server);
}