import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: FirebaseService, private router: Router, private afAuth: AngularFireAuth) {
      this.firebaseErrorMessage = '';
      
  }

  ngOnInit(): void {
      this.signupForm = new FormGroup({
          'displayName': new FormControl('', Validators.required),
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', Validators.required)
      });
  }

  signup() {
      if (this.signupForm.invalid)                            
          return;

      this.authService.signupUser(this.signupForm.value).then((result) => {
          if (result == null)                                
              this.router.navigate(['/profile']);
          else if (result.isValid == false)
              this.firebaseErrorMessage = result.message;
      }).catch(() => {

      });
  }
}
