import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { OmdbApiService } from '../../services/omdb-api.service';
import { MovieItem } from '../../models/movies';
import { RegExCustomValidator } from '../../shared/validators';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss']
})
export class SearchMovieComponent implements OnInit {

  title: string;
  type: string;
  isAdvSearch: boolean = false;
  autoSuggestion$: Observable<MovieItem[]>;
  keyword = new Subject<string>();
  searchType = [{
    "value":"All",
    "key":""
  }, {
    "value":"Film",
    "key":"movie"
  }, {
    "value":"TV",
    "key":"series"
  }]
  @Output() titleSearchStr = new EventEmitter();

  advSearchForm = this.fb.group({
    type: [''],
    title: ['',[Validators.required,Validators.minLength(1)]],
    year: ['',[RegExCustomValidator(/^[0-9]*$/), Validators.max(3000)]]
  })
  
  constructor(private fb: FormBuilder, private omdbApiService: OmdbApiService) { }

  ngOnInit() {
    this.advSearchForm.get('type').setValue(this.searchType[0].key);
    this.autoSuggestion$ = this.keyword.pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap((key)=>this.omdbApiService.getListForSuggestion(key))
    );
  }

  search(values){
    this.titleSearchStr.emit(values);
  }

  advSearch(){
    this.isAdvSearch = !this.isAdvSearch;
  }

  autoSuggest(isValid, key){
    if(isValid){
      this.keyword.next(key.trim());
    }
  }

}


