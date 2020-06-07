/* Imports */
// Angular
import { Component, OnInit, Input } from '@angular/core';

/* Componant configuration */
@Component({
  selector: 'app-item-post',
  templateUrl: './item-post.component.html',
  styleUrls: ['./item-post.component.scss']
})

/* Componant class definition */
export class ItemPostComponent implements OnInit {
  // Input  data from parent component
  @Input() post: any;

  constructor(){}

  ngOnInit(){}
};