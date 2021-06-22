import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { OmdbApiService } from '../../services/omdb-api.service';
import { Season } from '../../models/season';


@Component({
  selector: 'app-season-details',
  templateUrl: './season-details.component.html',
  styleUrls: ['./season-details.component.scss']
})
export class SeasonDetailsComponent implements OnInit {

  spinner: boolean;
  seasonData: Array<Season> = [];
  seasonItem: Season;
  pageLoad: boolean;
  Title: string;

  constructor(private omdbService: OmdbApiService, private router: Router, public location: Location ) { }

  ngOnInit() {
    this.spinner = true;
    this.Title = this.omdbService.fullTitle;
    for(let i=0;i<this.omdbService.totalSeasons;i++){
      this.seasonItem = {
        "SeasonNo": i,
        "Spinner": false
      }
      this.seasonData.push(this.seasonItem);
    }
    this.getSeasons(1);
  }

  getSeasons(seasonNo){
    if(!(this.seasonData[seasonNo-1].SeasonObject && this.seasonData[seasonNo-1].SeasonObject.Response=='True')){
      this.seasonData[seasonNo-1].Spinner = true;
      this.omdbService.getSeason(this.omdbService.imdb,seasonNo)
      .subscribe(
        next => {
          this.pageLoad = true;
          this.seasonData[seasonNo-1].SeasonObject = next;
          setTimeout(()=>{this.spinner=false;this.seasonData[seasonNo-1].Spinner =false},1000)
        },
        error=> { 
          this.seasonData[seasonNo-1].SeasonObject = {'Response':"False","Error":error.statusText};
          setTimeout(()=>{this.spinner=false;this.seasonData[seasonNo-1].Spinner =false},1000) 
        }
      )
    }
  }

  loadEpisode(seasonNo,EpisodeNo) {
    this.omdbService.season = seasonNo;
    this.omdbService.episode = EpisodeNo;
    this.router.navigateByUrl('/episodes', {skipLocationChange: true});
  }


}
