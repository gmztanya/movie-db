import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material'; 

import { MovieList } from '../../models/movies';
import { OmdbApiService } from '../../services/omdb-api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  @Input('movieTitle') title:string;
  @Output() onSearchSelect = new EventEmitter();
  
  spinner:Boolean;
  movieList: MovieList;
  length: number;  
  //pageSize = 10;  
  //pageSizeOptions: number[] = [10, 20]; 
  pageCounter = 1; 

  constructor(private omdbApiService: OmdbApiService, private snackbar : MatSnackBar) { }

  ngOnInit() {}

  ngOnChanges(): void {
    this.spinner = true;
    this.movieList = undefined;
    //this.getPageList(1);
    this.getPageList(this.pageCounter);
  }

  // onChangePage(pe:PageEvent) {
  //   this.getPageList(pe.pageIndex+1);
  // } 

  onLoadMore(){
    this.pageCounter++;
    this.getPageList(this.pageCounter+1)
  }

  getPageList(pageNo) {
    this.spinner = true;
    this.omdbApiService.getList(this.omdbApiService.title,this.omdbApiService.type,this.omdbApiService.year,pageNo)
    .subscribe(
      nextMovieList=> {
        if(nextMovieList.Response=="True"){
          this.length = parseInt(nextMovieList.totalResults);
          if(!this.movieList){
            this.movieList = nextMovieList;
            this.movieList.Search = nextMovieList.Search;
          } else {
            this.movieList.Search = this.movieList.Search.concat(nextMovieList.Search);
          }
          setTimeout(()=>{this.spinner=false;},1000);
        } else {
          this.length = 0;
          this.snackbar.open('no more results','',{duration:8000, panelClass: 'snackbar-msg'});
          setTimeout(()=>{this.spinner=false;},500);
        }
      },
      error=> { 
        this.snackbar.open(error.statusText,'',{duration:8000, panelClass: 'snackbar-msg'});
        setTimeout(()=>{this.spinner=false;},500);
      }
    )
  }

}
