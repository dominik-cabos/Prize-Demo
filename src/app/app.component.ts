import { Component, OnInit } from '@angular/core';
import { BonusService } from './services/bonus.service';
import { catchError, take, tap } from 'rxjs/operators';
import { Bonus } from './prize/models/bonus';
import { interval, Observable, of } from 'rxjs';

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

  private alertTimeout = 5000;
  hideReload = true;

  get getBonusService(): BonusService {
    return this.bonusService;
  }

  get getAlertTimeout(): number {
    return this.alertTimeout;
  }

  ngOnInit(): void {
    this.bonusFeed$ = this.getBonusService.getBonus().pipe(
      catchError((err, caught) => {
        this.error = err;
        interval(this.alertTimeout)
          .pipe(take(1))
          .subscribe((_) => (this.error = null));
        return of(null);
      }),
      tap((_) => {
        this.hideReload = false;
        if (!this.error) {
          this.bonusReady = true;
        }
      })
    );
  }

  finishBonus(): void {
    this.bonusFinished = true;
  }

  getLocationObject(): any {
    return window.location;
  }

  reload(): void {
    this.hideReload = true;
    this.getLocationObject().reload();
  }
}
