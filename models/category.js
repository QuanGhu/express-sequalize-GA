'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name:  {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter name'
        }
      },
      set(value) {
        this.setDataValue('name', value ? value.toLowerCase() : null);
      },
      get() {
        const rawValue = this.getDataValue('name');
        const result = rawValue ? rawValue.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        }) : null

        return result
      }
    }
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};