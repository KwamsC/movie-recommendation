import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Movie} from "../DOM/movie";
import { MovieService} from "../movie.service";
import {Watchlist} from "../DOM/watchlist";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  watchlists: Watchlist[];
  @Input() movie: Movie;

  constructor(  private route: ActivatedRoute,
                private movieService: MovieService,
                private location: Location) { }

  ngOnInit(): void {
    this.getMovie();
    this.getWatchlists();
  }

  getWatchlists(): void {
    this.movieService.getWatchlists().subscribe(watchlists => this.watchlists = watchlists);
  }

  onSubmit(): void{
    this.route.params.subscribe( params =>this.movieService.AddmovieToWatchlist(movie, params['id']).subscribe(movie=> this.movie=movie));
  }

  // getMovie(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.movieService.getMovie(id)
  //     .subscribe(movie => this.movie = movie);
  // }

  getMovie(): void {
    this.route.params.subscribe( params =>
    this.movieService.getMovie(params['id'])
      .subscribe(movie => this.movie = movie));
  }

  goBack(): void {
    this.location.back();
  }

  rateFive(): void{

  }


  //
  // save(): void {
  //   this.movieService.updateMovie(this.movie)
  //     .subscribe(() => this.goBack());
  // }

}
