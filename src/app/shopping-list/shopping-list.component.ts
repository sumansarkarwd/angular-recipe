import { NgForm } from '@angular/forms';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListServices } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  ingredients: Ingredient[];

  constructor( private shoppingListServices: ShoppingListServices ) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingListServices.getIngredients();
    this.subscription = this.shoppingListServices.ingredientAdded.subscribe(
      (ings: Ingredient[]) => {
        this.ingredients = ings;
      }
    );
  }

  onIngredientAdd(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  onIngredientEdit(index: number) {
    this.shoppingListServices.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
