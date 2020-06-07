/* Imports */

//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Inner
import { ObservableService } from "../../services/observable/observable.service";
import { CrudService } from "../../services/crud/crud.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

/* Componant class definition and export */
export class LoginPageComponent implements OnInit {

  constructor(private CrudService: CrudService, private Router: Router, private ObservableService: ObservableService) { }

  /* Start */
  ngOnInit() {}

  public getUserInfo = async (user: Object) => {

    let userInfo = await this.CrudService.createItem('login', user);

    //User logged in
    if(Object.keys(userInfo.data).length > 0){
      //Set user token in localStorage
      localStorage.setItem('token', userInfo.data.token);

      let currentUser = await this.CrudService.createItem('me', { token: localStorage.getItem('token') });

      if(Object.keys(currentUser.data).length > 0){
        // Set user bookmarks observable value
        this.ObservableService.setObservableData('bookmarks', currentUser.data.bookmark);

        //Change route endpoint
        this.Router.navigateByUrl('/');
      }
    }
  };
}