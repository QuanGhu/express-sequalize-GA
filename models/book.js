'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title:  {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter book title'
        }
      },
      set(value) {
        this.setDataValue('title', value ? value.toLowerCase() : null);
      },
      get() {
        const rawValue = this.getDataValue('title');
        const result = rawValue ? rawValue.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        }) : null

        return result
      }
    },
    author: {
      type : DataTypes.STRING,
      allowNull : true,
      set(value) {
        this.setDataValue('author', value ? value.toLowerCase() : null);
      },
      get() {
        const rawValue = this.getDataValue('author');
        const result = rawValue ? rawValue.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        }) : null

        return result
      }
    },
    category_id: {
      type :  DataTypes.INTEGER,
      allowNull : true
    }
  }, {});
  Book.associate = function(models) {
    Book.belongsTo(models.Category, {foreignKey: 'category_id', targetKey : 'id', as: 'category'})
  };
  return Book;
};