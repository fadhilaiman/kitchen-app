"use strict";

const router = require('express').Router();
const RecipeController = require('../controllers/recipeController');

const isLoginMiddleware = (req, res, next) => {
    if (req.session.isLogin) {
        next()
    } else {
        res.redirect('/login')
    }
}

// di /recipes
router.get('/', isLoginMiddleware, RecipeController.showRecipes)
router.get('/add', isLoginMiddleware, RecipeController.addRecipe)
router.post('/add', isLoginMiddleware, RecipeController.addRecipePost)
router.get('/edit/:id', isLoginMiddleware, RecipeController.editRecipe)
router.post('/edit/:id', isLoginMiddleware, RecipeController.editRecipePost)
router.get('/delete/:id', isLoginMiddleware, RecipeController.deleteRecipe)
router.get('/ingredients/:id', isLoginMiddleware, RecipeController.showIngredients)
router.post('/ingredients/add/:id', isLoginMiddleware, RecipeController.addIngredientToRecipe)


module.exports = router;