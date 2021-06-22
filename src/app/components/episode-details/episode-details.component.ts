import { Component, OnInit } from '@angular/core';

import { OmdbApiService } from '../../services/omdb-api.service';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.scss']
})
export class EpisodeDetailsComponent implements OnInit {

  searchTitle:string;

  constructor(private omdbApiService: OmdbApiService) { }

  ngOnInit() {
    this.searchTitle = this.omdbApiService.imdb;
    this.omdbApiService.key = 'episode';
  }

}
