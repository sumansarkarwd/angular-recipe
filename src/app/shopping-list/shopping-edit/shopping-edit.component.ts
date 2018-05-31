import { Subscription } from 'rxjs';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListServices } from '../shopping-list.service';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingrdientForm: NgForm;
  editingSubscription: Subscription;
  editMode = false;
  currentIndex: number;
  editingIngredient: Ingredient;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private ShoppingListServices: ShoppingListServices) { }

  ngOnInit() {
    this.editingSubscription = this.ShoppingListServices.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.currentIndex = index;
        this.editingIngredient = this.ShoppingListServices.getIngredientByIndex(this.currentIndex);
        this.ingrdientForm.setValue({
          name: this.editingIngredient.name,
          amount: this.editingIngredient.amount
        });
      }
    );
  }

  addNewIngredient(form: NgForm) {
    const values = form.value;
    const newIng = new Ingredient(values.name, values.amount);
    if (this.editMode) {
      this.ShoppingListServices.updateIngredient(this.currentIndex, newIng);
    } else {
      this.ShoppingListServices.addIngredient(newIng);
    }
    form.reset();
    this.editMode = false;
  }

  onClear() {
    this.ingrdientForm.reset();
    this.editMode = false;
  }

  onDelete() {
    if (this.currentIndex !== null) {
      this.ShoppingListServices.deleteIngredient(this.currentIndex);
      this.onClear();
    }
  }

  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }

}
