
const CommitModel = (sequelize, Sequelize) => {
    return sequelize.define("Commits", {
      commitId: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      changes: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.DATE
      }
    });
};

module.exports = {
    CommitModel
};