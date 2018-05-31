import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListServices {
    ingredientAdded = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [{
        name: 'Apple',
        amount: '5'
        }, {
        name: 'Banan',
        amount: '3'
    }];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientAdded.next(this.ingredients.slice());
    }

    addIngredients(ings: Ingredient[]) {
        // // tslint:disable-next-line:prefer-const
        // for (let ing of ings) {
        //     this.addIngredient(ing);
        // }
        this.ingredients.push(...ings);
        this.ingredientAdded.next(this.ingredients.slice());
    }

    getIngredientByIndex(index: number) {
        return this.ingredients[index];
    }

    updateIngredient(index: number, newIng: Ingredient) {
        this.ingredients[index] = newIng;
        this.ingredientAdded.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientAdded.next(this.ingredients.slice());
    }
}
