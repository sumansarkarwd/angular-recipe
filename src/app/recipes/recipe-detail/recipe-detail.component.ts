import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesServices } from '../recipes.services';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private rsServices: RecipesServices,
  private route: ActivatedRoute,
  private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.rsServices.getRecipeById(this.id);
      }
    );
  }

  onAddToShoppingList() {
    this.rsServices.addInfredientsToShoppingList(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.rsServices.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
