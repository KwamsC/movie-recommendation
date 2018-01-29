import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Movie} from "../DOM/movie";
import { MovieService} from "../movie.service";
import {Watchlist} from "../DOM/watchlist";
import { Rating} from "../DOM/rating";
import {RatingsService} from "../ratings.service";
import {User} from "../DOM/User";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  selectedWatchlist: Watchlist;
  watchlists: Watchlist[];
  @Input() movie: Movie;
  rating: Rating;
  user: User;
  // watchlistMovie: Movie

  constructor(  private route: ActivatedRoute,
                private movieService: MovieService,
                private location: Location,
                private ratingService: RatingsService) { }

  ngOnInit(): void {
    this.getMovie();
    this.getWatchlists();
    this.rating= new Rating();
    this.selectedWatchlist=new Watchlist();
  }

  getWatchlists(): void {
    this.movieService.getWatchlists().subscribe(watchlists => this.watchlists = watchlists);
  }
  //
  // onSubmit(): void{
  //   this.route.params.subscribe( params =>this.movieService.AddmovieToWatchlist(movie, params['id']).subscribe(movie=> this.movie=movie));
  // }

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

  getMovie1(){
    this.route.params.subscribe( params =>{
      return this.movieService.getMovie(params['id'])
        .subscribe(movie => this.movie = movie));
  }



  goBack(): void {
    this.location.back();
  }

  addTolist(): void{
    this.movieService.AddmovieToWatchlist(this.movie, this.selectedWatchlist.id).subscribe();
  }

  rateFive(): void{
    this.rating.score= "1";
    this.rating.timestamp="2018-01-27T23:12:30.037Z";
    this.rating.movieId=this.movie.id;
    this.rating.userId=localStorage.getItem('currentUser');
    this.ratingService.rateMovie(this.rating).subscribe();
  }



  //
  // save(): void {
  //   this.movieService.updateMovie(this.movie)
  //     .subscribe(() => this.goBack());
  // }

}
