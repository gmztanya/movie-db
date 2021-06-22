import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { EpisodeDetailsComponent } from './components/episode-details/episode-details.component';
import { SeasonDetailsComponent } from './components/season-details/season-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchMovieComponent,
    MovieDetailsComponent,
    MovieListComponent,
    EpisodeDetailsComponent,
    SeasonDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'seasons', component:SeasonDetailsComponent},
      {path:'episodes', component:EpisodeDetailsComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
