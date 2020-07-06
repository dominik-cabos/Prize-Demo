import {Component, OnInit} from '@angular/core';
import {BonusService} from './services/bonus.service';
import {catchError, take, tap} from 'rxjs/operators';
import {Bonus} from './prize/models/bonus';
import {interval, Observable, of} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todays-prize';
  error: any;

  constructor(private bonusService: BonusService) {}

  bonusFeed$: Observable<Bonus>;
  bonusReady = false;
  bonusFinished = false;

  private alertTimeout = 3000;
  hideReload = true;

  ngOnInit(): void {
    this.bonusFeed$ = this.bonusService.getBonus().pipe(
      catchError((err, caught) => {
        this.error = err;
        interval(this.alertTimeout)
          .pipe(take(1))
          .subscribe((_) => (this.error = null));
        return of(null);
      }),
      tap((_) => {
        if (!this.error) {
          this.bonusReady = true;
          this.hideReload = false;
        }
      })
    );
  }

  finishBonus(): void {
    this.bonusFinished = true;
  }

  reload(): void {
    this.hideReload = true;
    setTimeout((_) => window.location.reload(), 500);
  }
}
