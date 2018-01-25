import { Component, OnInit } from '@angular/core';
import { Movie} from "../DOM/movie";
import { MoviesComponent} from "../movies/movies.component";
import {MovieService} from "../movie.service";


@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {
  movies=Movie[]
  selectedMovie: M;


  constructor() { }

  ngOnInit() {
  }

}
