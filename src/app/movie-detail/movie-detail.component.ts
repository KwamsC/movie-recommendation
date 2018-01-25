import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Movie} from "../DOM/movie";
import { MovieService} from "../movie.service";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie: Movie;

  constructor(  private route: ActivatedRoute,
                private movieService: MovieService,
                private location: Location) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    this.route.params.subscribe( params =>
    this.movieService.getMovie(params['id'])
      .subscribe(movie => this.movie = movie));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.movieService.updateMovie(this.movie)
      .subscribe(() => this.goBack());
  }

}
