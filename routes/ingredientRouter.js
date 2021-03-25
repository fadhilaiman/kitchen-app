"use strict";

const router = require('express').Router();
const IngredientController = require('../controllers/ingredientController');

const isLoginMiddleware = (req, res, next) => {
    if (req.session.isLogin) {
        next()
    } else {
        res.redirect('/login')
    }
}

// di /ingredients
router.get('/', isLoginMiddleware, IngredientController.showIngredients)
router.get('/add', isLoginMiddleware, IngredientController.addIngredient)
router.post('/add', isLoginMiddleware, IngredientController.addIngredientPost)
router.get('/edit/:id', isLoginMiddleware, IngredientController.editIngredient)
router.post('/edit/:id', isLoginMiddleware, IngredientController.editIngredientPost)
router.get('/delete/:id', isLoginMiddleware, IngredientController.deleteIngredient)
router.get('/recipes/:id', isLoginMiddleware, IngredientController.showRecipes)

module.exports = router;