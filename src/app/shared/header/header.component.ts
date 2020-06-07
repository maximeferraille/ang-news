/* Imports */

//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Inner
import { ObservableService } from "../../services/observable/observable.service";
import { CrudService } from "../../services/crud/crud.service";

/* Componant configuration */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})

/* Componant class definition and export */
export class HeaderComponent implements OnInit {

/* Declaration */
  // Properties
  public currentUser: any;

  constructor(private ObservableService: ObservableService, private Router : Router, private CrudService: CrudService){
  // Get current user
    this.ObservableService.getUserInfo().subscribe( userDataObserver => {
      if(userDataObserver === null) { this.currentUser = null }
      else {
        if(Object.keys(userDataObserver).length > 0) {
          // Set local storage
          localStorage.setItem('token', userDataObserver.token );

          // Update userData value
          this.currentUser = userDataObserver;
        } else {
          this.currentUser = null
        }
      }
    })
  }

  public logout = () => {
    // Delete token in localStorage
    localStorage.removeItem('token');

    // Set user info observable value
    this.ObservableService.setObservableData('user', null);
    this.ObservableService.setObservableData('bookmarks', null)
    this.Router.navigateByUrl('/');
  }

/* Start */
  ngOnInit(){};
};