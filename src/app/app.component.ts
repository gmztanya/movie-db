import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OmdbApiService } from './services/omdb-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ng-movie-db';
  searchTitle: string;
  searchYear: number;
  searchType: string;
  showDetails: boolean = false;
  showMovieList: boolean = false;
  defaultTitle: string;
  showOption: Boolean = false;

  @HostListener('window:scroll') onScroll(){
    if(window.scrollY > 200){
      this.showOption = true;
    } else {
      this.showOption = false;
    }
  }

  constructor(private omdbApiService : OmdbApiService, private router: Router){}

  ngOnInit(){
    console.log('init in component.ts')
  }

  getDetails(e,type){
    this.showDetails = true;
    if(type==='imdb'){
      this.omdbApiService.imdb=e;
      this.searchTitle = e;
    } else {
      this.omdbApiService.title=e.title;
      this.omdbApiService.year=e.year;
      this.omdbApiService.type=e.type;
      this.searchTitle = e.title;
      this.searchYear = e.year;
      this.searchType = e.type;
    }
    this.omdbApiService.key=type;
    this.showMovieList = false;
    if(this.router.url !== '/'){
      this.router.navigateByUrl('/');
    }
  }

  loadSeasons(e){
    this.showDetails = false;
    this.omdbApiService.imdb = e;
    this.router.navigateByUrl('/seasons', {skipLocationChange: true});
  }

  searchForList(){
    this.showMovieList = true;
  }

  scrollToTop(){
    let search = document.getElementById('search');
    search.scrollIntoView();
  }

}

