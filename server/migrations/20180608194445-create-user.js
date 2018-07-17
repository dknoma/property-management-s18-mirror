'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		user_type: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		username: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		firstname: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		lastname: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE
		},
		// propertyId: {
		// 	type: Sequelize.INTEGER,
		// 	references: {
		// 	  model: 'Properties',
		// 	  key: 'id',
		// 	  as: 'propertyId',
		// 	},
		// }
	}),
	down: (queryInterface/*, Sequelize*/) =>  queryInterface.dropTable('Users'),
};