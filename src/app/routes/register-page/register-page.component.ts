/* Imports */

//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Inner
import { CrudService } from "../../services/crud/crud.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

/* Componant class definition and export */
export class RegisterPageComponent implements OnInit {

  constructor(private CrudService: CrudService, private Router: Router) { }

  /* Start */
  ngOnInit() {}

  public createUserInfo = async (user) => {

    delete user.confirmPassword

    let userInfo = await this.CrudService.createItem('register', user);

    //User is registered
    if(Object.keys(userInfo.data).length > 0){
      this.Router.navigateByUrl('/');
    }
  };
}
