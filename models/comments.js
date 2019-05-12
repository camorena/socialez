module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  });

  Comment.associate = function(models) {
    // We're saying that a Comment should belong to an User
    // A Comment can't be created without an User due to the foreign key constraint
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comment;
};
