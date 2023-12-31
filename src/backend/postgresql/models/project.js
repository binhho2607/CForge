
const ProjectModel = (sequelize, Sequelize) => {
    return sequelize.define("Projects", {
      projectId: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      projectName: {
        type: Sequelize.STRING,
      },
      projectToken: {
        type: Sequelize.STRING
      },
      users: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      commits: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
    });
};

module.exports = {
    ProjectModel
};