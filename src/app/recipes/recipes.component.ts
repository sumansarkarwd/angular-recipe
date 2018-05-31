import { Component, OnInit, Input } from '@angular/core';
import { RecipesServices } from './recipes.services';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipesServices]
})
export class RecipesComponent implements OnInit {

  constructor( ) { }

  ngOnInit() {
  }

}
