import {Component, inject} from '@angular/core';
import {UserService} from '../user-service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

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

  validateUser(form: any){
    const { email, password } = this.userData;
    this.userService.verifyUser(email, password).then((isValid)=>{
      if(isValid){
        console.log('Login successful!');
        this.router.navigate(['home']).then(r => {
          console.log(r);
        });
      }
      else{
        window.alert('Invalid email or password');
      }
    })
  }
}
