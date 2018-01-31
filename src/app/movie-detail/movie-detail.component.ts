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
  average: number;
  length:number;

  @Input() movie: Movie;

  ratings: Rating[];

  user: User;

  inputRating: Rating;
  ratingValue: string;
  ratingComment: string;

  constructor(  private route: ActivatedRoute,
                private movieService: MovieService,
                private ratingsService: RatingsService,
                private location: Location) { }


  ngOnInit(): void {
    this.getMovie();
    this.getWatchlists();
    this.getRatingsForMovie();
    this.inputRating = new Rating();
    this.selectedWatchlist = new Watchlist();
  }

  getWatchlists(): void {
    this.movieService.getWatchlists().subscribe(watchlists => this.watchlists = watchlists);
  }

  getMovie(): void {
    this.route.params.subscribe( params =>
      this.movieService.getMovie(params['id'])
        .subscribe(movie => this.movie = movie));
  }


  goBack(): void {
    this.location.back();
  }

  getAverage() {
    let total = 0;
    let count =0

    for (var i in this.ratings) {
      if (this.ratings[i].score) {
        total += Number(this.ratings[i].score);
      }
      count+=1;
    }
    this.average=total/count;
    return this.average;
  }

  getRatingsForMovie(): void {
    this.route.params.subscribe( params =>
      this.ratingsService.getRatingsByMovie(params['id'])
        .subscribe(ratings => this.ratings = ratings));
  }


  addTolist(): void {
    this.movieService.AddmovieToWatchlist(this.movie, this.selectedWatchlist.id).subscribe();
  }

  rateMovie(): void {
    const time =  new Date().toISOString().substr(0, 24);

    this.inputRating.comment = this.ratingComment;
    this.inputRating.score = this.ratingValue;
    this.inputRating.timestamp = time;
    console.log(this.inputRating.timestamp.toString());
    this.inputRating.movieId = this.movie.id;
    this.inputRating.userId = localStorage.getItem('currentUser');

    this.ratingsService.rateMovie(this.inputRating).subscribe(
      respons => {console.log('rating Succssful' + respons);
        this.getRatingsForMovie(); }
    );
  }
}


