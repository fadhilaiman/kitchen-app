"use strict";

const router = require('express').Router();
const UserRouter = require('./userRouter');
const RecipeRouter = require('./recipeRouter');
const IngredientRouter = require('./ingredientRouter');


// setting routes
router.use(UserRouter);
router.use('/recipes', RecipeRouter);
router.use('/ingredients', IngredientRouter);

module.exports = router;