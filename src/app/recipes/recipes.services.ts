import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListServices } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipesServices {
    recipeAdded = new Subject<Recipe[]>();
    private recipes: Recipe[] = [{
                            name: 'Chicken Burger',
                            description: 'Made with Chicken love',
                            photo:  'http://cloudheadtechnologies.com/test/hamburger.png',
                            ingredients: [
                                new Ingredient('Chicken', '1'),
                                new Ingredient('Bread', '2')
                            ]
                        }, {
                            name: 'Paneer Sandwich',
                            description: 'Made for my Veg niggas',
                            photo: 'http://cloudheadtechnologies.com/test/sandwich.png',
                            ingredients: [
                                new Ingredient('Paneer', '1'),
                                new Ingredient('Bread', '2'),
                            ]
                        }];

    constructor( private slService: ShoppingListServices) {}

    getRecipes() {
        return this.recipes.slice();
    }

    addInfredientsToShoppingList(ings: Ingredient[]) {
        this.slService.addIngredients(ings);
    }

    getRecipeById(index: number) {
        return this.recipes[index];
    }

    addRecipe(newRecipe: Recipe) {
        this.recipes.push(newRecipe);
        this.recipeAdded.next(this.recipes.slice());
    }

    updateRecipe(index: number, editedRecipe: Recipe) {
        this.recipes[index] = editedRecipe;
        this.recipeAdded.next(this.recipes.slice());
    }

    setRecipe(recipe: Recipe[]) {
        this.recipes = recipe;
        this.recipeAdded.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeAdded.next(this.recipes.slice());
    }
}
