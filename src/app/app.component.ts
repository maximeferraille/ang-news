/* Import */
// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Inner
import { CrudService } from "./services/crud/crud.service";

/* Componant configuration */
@Component({
    selector: 'app-root',
    template: `
      <app-header></app-header>
      <router-outlet></router-outlet>
    `
})

/* Componant class definition */
export class AppComponent implements OnInit {
  constructor(private CrudService: CrudService, private Router: Router){}

  /* Start */
  ngOnInit(){}
}
