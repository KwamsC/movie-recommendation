import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Movie} from "../DOM/movie";

import {RatingsService} from "../ratings.service";
import {RecommendationService} from "../recommendation.service";


@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  recommendedMovies: Movie[];

  @Input() movieId: string;

  constructor(private recommendationService: RecommendationService) { }

  ngOnInit() {
    this.recommendationService
      .getRecommendedMovies(this.movieId)
      .subscribe(recommendations => this.recommendedMovies = recommendations);
  }

}
