'use strict';
module.exports = (sequelize, DataTypes) => {
  const Inbox = sequelize.define('Inbox', {}, {});
  Inbox.associate = (models) => {
    Inbox.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    }),
    Inbox.hasMany(models.Message, {
      foreignKey: 'inboxId',
      as: 'messages',
    })
  }
  return Inbox;
};