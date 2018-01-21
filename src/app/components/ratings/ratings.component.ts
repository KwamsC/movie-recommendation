import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../services/messageservice/message.service';

import { Rating } from '../../DOM/rating';
import { RatingsService } from '../../services/ratingsservice/ratings.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  ratings: Rating[];

  constructor(private ratingsService: RatingsService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getRatings();
  }

  getRatings(): void{
    this.ratingsService.getRatings()
     .subscribe(ratings => this.ratings = ratings);
  }

}
