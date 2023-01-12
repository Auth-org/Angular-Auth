import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-of-heroes';
  isSignedIn = false;
  constructor(public firebaseService : FirebaseService) {}
  ngOnInit() {
    if (localStorage.getItem('user') !== null)
    this.isSignedIn = true
    else 
    this.isSignedIn = false
  }
  handlelogout () {
    this.isSignedIn = false

  }
  
}
