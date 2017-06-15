import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import {User} from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  users = [];

  message: string = "";

  email: string = "";

  password: string = "";

  userMode: string = "Register";

  buttonValue: string = "login"
	
	constructor(private userService: UserService, private router: Router) {

	}

  ngOnInit() {

  }

  onRegister(email, password){
    if(password.length < 6){
      alert('Password should be at least six characters!')
    }
    this.userService.register(email, password)
    .subscribe(response => {
      this.message = response.json()['message']
      alert(this.message)
      if(response){
        this.users = response
        this.onLogin(this.email, this.password)
      }
    });
    }

  onLogin(email, password){
    this.userService.login(email, password)
    .subscribe(response => {
      this.message = response.json()['message']
      if(response.json()['access_token']){
        localStorage.setItem('token', response.json()['access_token'])
        this.router.navigate(["/bucketlists"])
      }
    });
  }

  onHome(){
        this.router.navigate([""])
  }

  onToggle(){
    this.buttonValue = this.buttonValue == "login"? "register": "login";
    this.userMode = this.userMode == "Register"? "Login": "Register";
  }

}
