'use strict';
const bcrypt = require('bcrypt'),
  saltRounds = 10
  
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type : DataTypes.STRING,
      allowNull: true
    },
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your email'
        }
      },
      unique: true,
      set(value) {
        this.setDataValue('email', value ? value.toLowerCase() : null);
      },
      get() {
        const rawValue = this.getDataValue('email');
        const result = rawValue ? rawValue.toLowerCase() : null

        return result
      }
    },
    password: {
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your password'
        }
      },
      type : DataTypes.STRING,
      set(value) {
        this.setDataValue('password', value ? bcrypt.hashSync(value, saltRounds) : null)
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};