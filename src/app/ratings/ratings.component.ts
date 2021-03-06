import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';

import { Rating } from '../DOM/rating';
import { RatingsService } from '../ratings.service';


@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  ratings: Rating[];
  rating: Rating;

  constructor(private ratingsService: RatingsService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.rating = new Rating();
    this.getRatings();
  }

  getRatings(): void {
    this.ratingsService.getRatings()
     .subscribe(ratings => this.ratings = ratings);
  }



}
