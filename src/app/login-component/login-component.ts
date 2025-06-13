import {Component, inject} from '@angular/core';
import {UserService} from '../user-service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {catchError, of, tap} from 'rxjs';

@Component({
  selector: 'app-login-component',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  userService = inject(UserService);
  router = inject(Router);

  userData = {
    email: '',
    password: ''
  }
  errorMessage:string | null = null;
  validateUser(form: any){
    const { email, password } = this.userData;
    this.errorMessage = null;

    this.userService.verifyUser(email, password).pipe(
      tap(isValid=>{
        if(isValid){
          console.log('login successful');
          this.router.navigate(['/books']);
        }else{
          console.log('login failed');
          this.errorMessage = 'Invalid email or password';
        }
      }),
      catchError(err=>{
        this.errorMessage = 'An error occurred during login. Please try again.'
        console.error(err);
        return of(false);
      })
    ).subscribe()
  }
}
