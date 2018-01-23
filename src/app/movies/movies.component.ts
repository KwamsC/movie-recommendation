import { Component, OnInit } from '@angular/core';

import {Movie} from "../DOM/movie";
import {MovieService} from "../movie.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movie: Movie;
  id: "3613903f7d93fadc7ba5817b87938c44";

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovie();
  }

  getMovie(): void {
    this.movieService.getMovie(this.id).subscribe(movie=>this.movie);
  }
}
