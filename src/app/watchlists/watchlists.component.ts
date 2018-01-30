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
  watchlistWC: Watchlist;
  watchlists: Watchlist[];
  movies: Movie[];
  userId: String;
  watchlistId: String;

  constructor(private watchlistService: WatchlistService, private route: ActivatedRoute) {
    this.resetWorkingCopy();
  }

  ngOnInit() {
    this.getWatchlists();
  }

  resetWorkingCopy() {
    this.watchlistWC = new Watchlist();
    this.watchlistWC.public = false;
  }

  createWatchlist() {
    const wc = this.watchlistWC;
    this.watchlistService.createWatchlist(wc).subscribe(w => {
      this.resetWorkingCopy();
      this.getWatchlists();
    })
  }

  getWatchlists(): void {
    this.watchlistService.getWatchlists().subscribe(w => {
      this.watchlists = w;
      if (w && w[0]) {
        this.onChange(w[0].id);
      }
    });
  }

  shareWatchlist(): void {
    const watchlistId = this.watchlistId;
    const userId = this.userId;

    if (!watchlistId || !userId) {
      return;
    }

    this.watchlistService.shareWatchlist(watchlistId, userId).subscribe();
  }

  deleteWatchlist(): void {
    const watchlistId = this.watchlistId;

    if (!watchlistId) {
      return;
    }

    this.watchlistService.deleteWatchlist(watchlistId).subscribe(x => {
      this.getWatchlists();
    });
  }

  onChange(id): void {
    this.watchlistId = id;
    this.watchlistService.getWatchlistMovies(id).subscribe(m => this.movies = m);
  }
}
