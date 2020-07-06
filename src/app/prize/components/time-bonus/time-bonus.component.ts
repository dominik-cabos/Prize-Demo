import {Component, EventEmitter, Input, OnChanges, OnInit, Output,} from '@angular/core';
import {Bonus} from '../../models/bonus';
import {Observable, timer} from 'rxjs';
import {scan, takeWhile, tap} from 'rxjs/operators';

@Component({
  selector: 'app-time-bonus',
  templateUrl: './time-bonus.component.html',
  styleUrls: ['./time-bonus.component.scss'],
})
export class TimeBonusComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() bonusData: Bonus;

  @Output() bonusClaim = new EventEmitter<Bonus>();

  @Output() bonusTimeout = new EventEmitter<Bonus>();

  @Output() bonusClose = new EventEmitter<Bonus>();

  claimed = false;
  countdown$: Observable<number>;

  ngOnInit(): void {}

  ngOnChanges(change): void {
    if (!this.bonusData) {
      return;
    }

    this.countdown$ = timer(0, 1000).pipe(
      scan((acc) => --acc, this.bonusData.countdown),
      takeWhile((x) => x >= 0 && !this.claimed),
      tap((x) => {
        if (x === 0) {
          this.bonusTimeout.emit(this.bonusData);
        }
      })
    );
  }

  claim(): void {
    this.claimed = true;
    this.bonusClaim.emit(this.bonusData);
  }

  close(): void {
    this.bonusClose.emit(this.bonusData);
  }
}
