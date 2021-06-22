import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OmdbApiConfigService } from './omdb-api-config.service';
import { Movie, MovieItem, MovieList } from '../models/movies';
import { SeasonList } from '../models/season';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {

  private _title: string;
  private _year: number;
  private _type: string;
  private _key: string;
  private _season: string;
  private _episode: string;
  private _imdb: string;
  private _totalSeasons: number;
  private _fullTitle: string;

  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
  
  public get year(): number {
    return this._year;
  }
  public set year(value: number) {
    this._year = value;
  }
  
  public get type(): string {
    return this._type;
  }
  public set type(value: string) {
    this._type = value;
  }
  
  public get key(): string {
    return this._key;
  }
  public set key(value: string) {
    this._key = value;
  }
  
  public get season(): string {
    return this._season;
  }
  public set season(value: string) {
    this._season = value;
  }
  
  public get episode(): string {
    return this._episode;
  }
  public set episode(value: string) {
    this._episode = value;
  }

  public get imdb(): string {
    return this._imdb;
  }
  public set imdb(value: string) {
    this._imdb = value;
  }

  public get totalSeasons(): number {
    return this._totalSeasons;
  }
  public set totalSeasons(value: number) {
    this._totalSeasons = value;
  }

  public get fullTitle(): string {
    return this._fullTitle;
  }
  public set fullTitle(value: string) {
    this._fullTitle = value;
  }

  constructor(private http: HttpClient, private serviceConfig: OmdbApiConfigService) { }

  getData (title, key, type, year): Observable<Movie> {
    if(key=='imdb'){
      return this.http.get<Movie>(this.serviceConfig.queryGenerator(title,key));
    } else {
      return this.http.get<Movie>(this.serviceConfig.queryGenerator(title,key,type,year));
    }
  }

  getSeason (id,seasonNo): Observable<SeasonList> {
    return this.http.get<SeasonList>(this.serviceConfig.queryGenerator(id,'imdb','','','',seasonNo));
  }

  getEpisode (id,seasonNo,episodeNo): Observable<Movie> {
    return this.http.get<Movie>(this.serviceConfig.queryGenerator(id,'imdb','','','',seasonNo,episodeNo));
  }

  getListForSuggestion (title): Observable<MovieItem[]> {
    return this.http.get<MovieList>(this.serviceConfig.queryGenerator(title,'list')).pipe(map(result=>result.Search));
  }

  getList (title,type?,year?,pageNo?): Observable<MovieList> {
    return this.http.get<MovieList>(this.serviceConfig.queryGenerator(title,'list',type,year,pageNo));
  }

}
