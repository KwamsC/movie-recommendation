import { Component, OnInit } from '@angular/core';

import { Movie } from '../DOM/movie';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';
import { Watchlist} from "../DOM/watchlist";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  watchlist: Watchlist;
  movie: Movie;
  watchlists: Watchlist[];
  modalMovieId: String;
  movies: Movie[];

  constructor(private movieService: MovieService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMovies();
    this.getWatchlists();
  }


  getMovies(): void {
    this.movieService.getMovies().subscribe(movies => this.movies = movies);
  }
  //
  // getMovie(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.movieService.getMovie(id)
  //     .subscribe(movie => this.movie = movie);
  // }

  getWatchlists(): void {
    this.movieService.getWatchlists().subscribe(watchlists => this.watchlists = watchlists);
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

  setModalMovieId(movieId: String): void {
    this.modalMovieId = movieId;
  }
}
