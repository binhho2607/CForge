
const ChangeModel = (sequelize, Sequelize) => {
    return sequelize.define("Changes", {
      changeId: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      changeType: {
        type: Sequelize.STRING
      },
      key: {
        type: Sequelize.STRING
      },
      oldValue: {
        type: Sequelize.STRING
      },
      newValue: {
        type: Sequelize.STRING
      }
    });
};

module.exports = {
    ChangeModel
};