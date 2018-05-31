import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesServices } from '../recipes.services';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private rsServices: RecipesServices,
  private route: ActivatedRoute
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



}
