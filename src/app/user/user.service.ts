import { Injectable } from '@angular/core';
import {User} from './user';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    // This is where your methods and properties go, for example: 

	constructor(
	  private api: ApiService
	) {
	}

  // Simulate POST /auth/register
  register(email, password){
  	return this.api.register(email, password);
  }

  // Simulate POST /auth/register
  login(email, password){
  	return this.api.login(email, password);
  }

}
