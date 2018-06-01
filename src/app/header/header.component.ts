import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/datastorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor( private dsService: DataStorageService,
  private authService: AuthService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dsService.storeData().subscribe(
      (response: Response) => {
        console.log(response);
      }
      // (response) => console.log(response),
      // (error) => console.error(error)
    );
  }
  onFetchData() {
    this.dsService.fetchData();
  }
  onLogout() {
    this.authService.logout();
  }
}
