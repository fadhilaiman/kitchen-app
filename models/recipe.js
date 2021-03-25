'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.belongsTo(models.User, { 
        foreignKey: 'UserId' 
      })
      Recipe.belongsToMany(models.Ingredient, {
        through: models.RecipeIngredient,
        foreignKey: 'RecipeId'
      })
    }

    toCalories() {
      return `${this.calories} calories`
    }
  };
  Recipe.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Food name field required!'
        }
      }
    },
    cookingTime: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Cooking time field required!'
        },
        min: {
          args: 5,
          msg: 'minimal time is 5'
        }
      }
    },
    calories: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Calories field required!'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'UserId field required!'
        }
      }
    },
    urlLink: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Url link field required!'
        },
        isUrl: {
          msg: 'Url must be valid'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Recipe',
  });

  return Recipe;
};