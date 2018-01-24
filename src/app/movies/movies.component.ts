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

<<<<<<< HEAD
  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.movieService.addMovie({name} as Movie)
  //     .subscribe(movie => {
  //       this.movies.push(movie);
  //     });
  // }

  delete(movie: Movie): void {
    this.movies = this.movies.filter(h => h !== movie);
    this.movieService.deleteMovie(movie).subscribe();
  }

=======
  getMovie(): void {
    this.movieService.getMovie(this.id).subscribe(movie=>this.movie);
  }
>>>>>>> 2ac450cb08874b14fb7980d20254e113dcdb20a5
}
