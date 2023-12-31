
const UserModel = (sequelize, Sequelize) => {
    return sequelize.define("Users", {
      userId: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      projects: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
    });
};

module.exports = {
    UserModel
};