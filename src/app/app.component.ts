import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedMenu = 'recipe';
  onMenuSelect(menu: string) {
    this.selectedMenu = menu;
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA-LFbQMBZEqMfmSkwQ3XALxju23Pq1epg',
      authDomain: 'recipe-book-431d2.firebaseapp.com'
    });
  }
}
