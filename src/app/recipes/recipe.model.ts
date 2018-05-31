import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public photo: string;
    public ingredients: Ingredient[];

    constructor(name: string, des: string, photo: string, ingredient: Ingredient[]) {
        this.name = name;
        this.description = des;
        this.photo = photo;
        this.ingredients = ingredient;
    }
}
