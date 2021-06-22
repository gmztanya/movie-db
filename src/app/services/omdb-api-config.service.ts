import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiConfigService {

  baseUrl:string = "https://www.omdbapi.com/";
  apiKey:string = "cb88f6e1";

  constructor() { }

  queryGenerator(title:string, searchType:string, type?:string, year?:string, 
    pageNo?:string, seasonNo?:string, episodeNo?:string):string {
    let query:string= this.baseUrl + "?apikey=" + this.apiKey+"&plot=full";
    if(searchType=='title'){
      query = query+"&t="+title.replace(/ /g,'+');
    } else if(searchType=='imdb') {
      query = query+"&i="+title.replace(/ /g,'+');
    } else {
      query = query+"&s="+title.replace(/ /g,'+');
    }
    if(type){
      query = query+"&type="+type;
    }
    if(year){
      query = query+"&y="+year;
    }
    if(pageNo){
      query = query+"&page="+pageNo;
    }
    if(seasonNo){
      query = query+"&Season="+seasonNo;
    }
    if(episodeNo){
      query = query+"&Episode="+episodeNo;
    }
    return query;
  }
}
