'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    viewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {});
  Message.associate = (models) => {
    Message.belongsTo(models.Inbox, {
      foreignKey: 'inboxId',
      onDelete: 'CASCADE'
    }),
    Message.belongsTo(models.User, {
      foreignKey: 'senderId',
    }),
    Message.belongsTo(models.User, {
      foreignKey: 'receiverId',
    })
  };
  return Message;
};