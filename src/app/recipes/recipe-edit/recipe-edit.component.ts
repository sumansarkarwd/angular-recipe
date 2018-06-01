import { Recipe } from './../recipe.model';
import { RecipesServices } from './../recipes.services';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;

  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeServices: RecipesServices
   ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = param['id'];
        this.editMode = param['id'] != null;
        // console.log(this.editMode);
        this.initForm();
      }
    );
  }

  private initForm() {
    let rName = '';
    let rImgSrc = '';
    let rDesc = '';
    // tslint:disable-next-line:prefer-const
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeServices.getRecipeById(this.id);
      rName = recipe.name;
      rImgSrc = recipe.photo;
      rDesc = recipe.description;
      if (recipe['ingredients']) {
        for ( const ingr of recipe.ingredients ) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingr.name, Validators.required),
            'amount': new FormControl(ingr.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup ({
      'name': new FormControl(rName, Validators.required),
      'imgSrc': new FormControl(rImgSrc, Validators.required),
      'description': new FormControl(rDesc, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onSubmit() {
    const newRecipe: Recipe = {
      name : this.recipeForm.value['name'],
      description : this.recipeForm.value['description'],
      photo : this.recipeForm.value['imgSrc'],
      ingredients : this.recipeForm.value['ingredients']
    };
    if (this.editMode) {
      this.recipeServices.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeServices.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
