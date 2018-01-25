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

  movies: Movie[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }


  getMovies(): void {
    this.movieService.getMovies().subscribe(movies => this.movies = movies);
  }

  getMovie(): void {
    this.movieService.getMovie(this.id).subscribe(movie => this.movie = movie);
  }

  sortAsc() {
    this.movies.sort((m1, m2) => {
      if(m1.title > m2.title) return 1;
      if(m1.title === m2.title) return 0;
      if(m1.title < m2.title) return -1;
    })
  }

  sortDesc() {
    this.movies.sort((m1, m2) => {
      if(m1.title > m2.title) return -1;
      if(m1.title === m2.title) return 0;
      if(m1.title < m2.title) return 1;
    })
  }

}
