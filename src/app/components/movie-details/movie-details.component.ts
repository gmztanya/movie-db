import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from 'src/app/models/movies';
import { OmdbApiService } from '../../services/omdb-api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movieTitle: string;
  panelOpenState:Boolean = false;
  @Output() setList = new EventEmitter();
  @Output() showSeasons = new EventEmitter();
  movieDetails: Movie;
  spinner: boolean;
  title:string;
  key:string;
  fullTitle:string;
  episode:string;
  season:string;

  constructor(private omdbService: OmdbApiService, private router: Router) { }

  ngOnInit() {}

  ngOnChanges(){
    this.spinner = true;
    this.key = this.omdbService.key;
    this.fullTitle = this.omdbService.fullTitle;
    this.episode = this.omdbService.episode;
    this.season = this.omdbService.season;
    this.getMovieData();
  }

  getMovieData(){
    if(this.omdbService.key !== "episode"){
      this.omdbService.getData(this.movieTitle, this.omdbService.key, this.omdbService.type, this.omdbService.year)
      .subscribe(
        movie => {
          this.movieDetails = movie;
          this.movieDetails.GenreArr = this.movieDetails.Genre ? this.movieDetails.Genre.split(',') : [];
          this.movieDetails.WriterArr = this.movieDetails.Writer ? this.movieDetails.Writer.split(',') : [];
          this.movieDetails.ActorsArr = this.movieDetails.Actors ? this.movieDetails.Actors.split(',') : [];
          setTimeout(()=>{this.spinner=false;},1000);
        },
        error=> { 
          console.log(error);
          this.movieDetails = {'Response':"False", "Error": error.statusText}; 
          setTimeout(()=>{ this.spinner=false; },1000);
        }
      )
    }
    else {
      this.omdbService.getEpisode(this.omdbService.imdb,this.omdbService.season,this.omdbService.episode)
      .subscribe(
        episode => {
          this.movieDetails = episode;
          this.movieDetails.GenreArr = this.movieDetails.Genre ? this.movieDetails.Genre.split(',') : [];
          this.movieDetails.WriterArr = this.movieDetails.Writer ? this.movieDetails.Writer.split(',') : [];
          this.movieDetails.ActorsArr = this.movieDetails.Actors ? this.movieDetails.Actors.split(',') : [];
          setTimeout(()=>{this.spinner=false;},1000)
        },
        error=> { 
          this.movieDetails = {'Response':"False","Error":error.statusText};
          setTimeout(()=>{this.spinner=false;},1000)
        }
      )
    }
  }

  loadSeasons(){
    this.omdbService.totalSeasons = parseInt(this.movieDetails.totalSeasons); 
    this.omdbService.fullTitle = this.movieDetails.Title;
    this.showSeasons.emit(this.movieDetails.imdbID);
  }

  goBack(){
    this.router.navigateByUrl('/seasons', {skipLocationChange: true});
  }

}
