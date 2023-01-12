import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
    selector: 'app-sign-in',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: FirebaseService, private router: Router, private afAuth: AngularFireAuth) {
      this.loginForm = new FormGroup({
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', Validators.required)
      });

      this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
      
  }

  loginUser() {
      if (this.loginForm.invalid)
          return;

      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
          if (result == null) {                              
              console.log('logging in...');
              this.router.navigate(['/profile']);                
          }
          else if (result.isValid == false) {
              console.log('login error', result);
              this.firebaseErrorMessage = result.message;
          }
      });
  }
}

