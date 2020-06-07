/* Imports */

//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Inner
import { CrudService } from "../../services/crud/crud.service";
import { ObservableService } from "../../services/observable/observable.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public sources: any;
  public sourceArticles = [];
  public bookmarks = [];
  public keyword: string;
  public lastSource: string;
  public apiKey = environment.apiKey;

  constructor(private ObservableService: ObservableService,private CrudService: CrudService, private Router: Router) { }

  // Sources methods
    /* get all sources */
    public getAllSources = async() => {
      let sources = await this.CrudService.createItem('news/sources/', { news_api_token: this.apiKey });
      if(sources.data.sources.length > 0){ this.sources = sources.data.sources; }
    }

    /* Get articles by source */
    public getSourceArticles = async({ source, keywords = '' }) => {
      if(source !== null){
        // store last research in cache
        localStorage.setItem('lastSource', source);
        keywords !== '' ? localStorage.setItem('lastKeyword', source) : localStorage.removeItem('lastKeyword');

        let articles = await this.CrudService.createItem(`news/${source}/${keywords}`, { news_api_token: this.apiKey });
        if(articles.data.articles.length >= 0){ this.sourceArticles = articles.data.articles; }
      }
    };

    /* Get articles by source with last research */
    public getLastSourceArticles() {
      this.getSourceArticles({ source: localStorage.getItem('lastSource'), keywords: localStorage.getItem('lastKeyword') })
    };

  // Bookmarks methods
    /* get all bookmarks */
    public getBookmarks(){
      this.ObservableService.getBookmarks().subscribe(bookmarks => { this.bookmarks = bookmarks; })
    }

    /* Add bookmark */
    addBookmarks = async(sourceId: String) => {
      if (sourceId === null) return;

      let source   = this.sources.find(source => source.id === sourceId);
      let bookmark = await this.CrudService.createItem('bookmark', { ...source, token: localStorage.getItem('token') });

      if(Object.keys(bookmark.data.data).length > 0){
        this.bookmarks.push(bookmark.data.data);
        this.ObservableService.setObservableData('bookmarks', this.bookmarks);
      }
    }

    /* Remove bookmark */
    removeBookmard = async(sourceId: String) => {
      if (sourceId === null) return;

      let bookmark = this.bookmarks.find(bookmark => bookmark.id === sourceId);

      let token = localStorage.getItem('token');
      let bookmarks = await this.CrudService.deleteItem('bookmark', bookmark._id, { token });

      if(bookmarks.err === null){
          this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== sourceId);
          this.ObservableService.setObservableData('bookmarks', this.bookmarks);
      }
    }

  /* Start */
  ngOnInit() {
    this.getAllSources();
    this.getBookmarks();

    if (localStorage.getItem('lastKeyword')) this.keyword = localStorage.getItem('lastKeyword');

    if (localStorage.getItem('lastSource')) {
      this.lastSource = localStorage.getItem('lastSource');
      this.getLastSourceArticles();
    }
  }

}
