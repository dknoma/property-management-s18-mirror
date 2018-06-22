'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		user_type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		firstname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				len: [6, 18],
			},
			allowNull: false,
		},
	},{
		hooks: {
			//hook that will hash the password before creating the User and storing it into the database
			beforeCreate: function(user, options) {
				return bcrypt.hash(user.password, 10)
				.then(hash => {
					user.password = hash;
				})
				.catch(error => {
					throw error;
				})
			}
		}
	});
	// User.associate = (models) => {
	// 	User.hasMany(models.Todo, {
	// 		foreignKey: 'userId',
	// 		as: 'todos',
	// 	});
	// };
	return User;
};