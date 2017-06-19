import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { NotificationsService } from 'angular2-notifications';

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
	
	constructor(private userService: UserService, 
    private router: Router,
    private service: NotificationsService
    ) {

	}

  ngOnInit() {

  }

  onRegister(email, password){
    if(email){
    if(password.length < 6){
      this.service.info(
          'Alert',
          "Password should be at least six characters!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    })    }
    this.userService.register(email, password)
    .subscribe(response => {
      this.message = response.json()['message']
      alert(this.message)
      if(response){
        this.users = response
        this.onLogin(this.email, this.password)
        this.service.success(
          'Success',
          "Account Created successfully!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    })
      }
    });
    }
    else{
      this.service.info(
          'Alert',
          "Please enter email!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    })
    }
  }

  onLogin(email, password){
    this.userService.login(email, password)
    .subscribe(response => {
      this.message = response.json()['message']
      if(response.json()['access_token']){
        localStorage.setItem('token', response.json()['access_token'])
        this.router.navigate(["/bucketlists"])
        this.service.success(
          'Success',
          "User Logged in Successfully!",
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
    })
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
