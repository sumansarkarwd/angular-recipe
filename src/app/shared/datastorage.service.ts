import { AuthService } from './../auth/auth.service';
import { RecipesServices } from './../recipes/recipes.services';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()

export class DataStorageService {
    constructor( private http: Http,
        private recipeService: RecipesServices,
        private authService: AuthService) {}

    storeData(): any {
        const token = this.authService.getToken();
        return this.http.put('https://recipe-book-431d2.firebaseio.com/data.json?auth=' + token, this.recipeService.getRecipes());
    }

    fetchData() {
        const token = this.authService.getToken();
        this.http.get('https://recipe-book-431d2.firebaseio.com/data.json?auth=' + token)
        .subscribe(
            (response: any) => {
                const data = response.json();
                this.recipeService.setRecipe(data);
            }
        );
    }
}
