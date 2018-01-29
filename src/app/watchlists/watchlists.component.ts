import { Component, OnInit } from '@angular/core';

import { Movie } from '../DOM/movie';
import { WatchlistService } from '../watchlist.service';
import { ActivatedRoute } from '@angular/router';
import { Watchlist} from "../DOM/watchlist";

@Component({
  selector: 'app-watchlists',
  templateUrl: './watchlists.component.html',
  styleUrls: ['./watchlists.component.css']
})
export class WatchlistsComponent implements OnInit {
  watchlists: Watchlist[];
  movies: Movie[];

  constructor(private watchlistService: WatchlistService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getWatchlists();
  }

  getWatchlists(): void {
    this.watchlistService.getWatchlists().subscribe(w => {
      this.watchlists = w;
      if (w && w[0]) {
        this.onChange(w[0].id);
      }
    });
  }

  onChange(id): void {
    this.watchlistService.getWatchlistMovies(id).subscribe(m => this.movies = m);
  }
}
