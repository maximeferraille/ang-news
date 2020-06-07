
/* Imports */

//Angular
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

//Inner
import { ObservableService } from '../../services/observable/observable.service';

/* Componant configuration */
@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styles: []
})

/* Componant class definition */
export class FormSearchComponent implements OnInit {

    @Input() sources   = [];
    @Input() bookmarks = [];
    @Input() lastKeyword: String;
    @Input() lastSource: String;

    @Output() formSubmit     = new EventEmitter();
    @Output() addBookmark    = new EventEmitter();
    @Output() removeBookmark = new EventEmitter();

    public formData: FormGroup;
    public currentUser: Boolean;
    public inBookmark: Boolean;

    constructor(private ObservableService: ObservableService, private FormBuilder: FormBuilder) {
      this.ObservableService.getUserInfo().subscribe(user => {
        this.currentUser = user !== null ? true : false
      });
    }

    // check if source is in user bookmark
    isInBookmarks = (sourceId) => {
      if(this.currentUser === true && this.bookmarks !== null){
        this.inBookmark = this.bookmarks.some(bookmarks => bookmarks.id === sourceId) ? true : false
      }
      return this.inBookmark;
    }

    // Put the last source if it exists. Null instead
    private resetForm = () => {
      this.formData = this.FormBuilder.group({
        source: [ localStorage.getItem('lastResearch') ? null : localStorage.getItem('lastResearch'), Validators.required ],
        keywords: [ null ],
      });
    };

    /* Start */
    ngOnInit() {
      this.resetForm();
    }

    /* Remove last research and reset form */
    resetNewsForm(){
      localStorage.removeItem('lastResearch');
      this.resetForm();
    }

}