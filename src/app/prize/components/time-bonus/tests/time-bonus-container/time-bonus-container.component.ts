import { Component, OnInit, ViewChild } from '@angular/core';
import { TimeBonusComponent } from '../../time-bonus.component';
import {Observable} from 'rxjs';
import {Bonus} from '../../../../models/bonus';

@Component({
  selector: 'app-time-bonus-container',
  templateUrl: './time-bonus-container.component.html',
})
export class TimeBonusContainerComponent implements OnInit {
  bonusFeed$: Observable<Bonus>;

  constructor() {}

  @ViewChild(TimeBonusComponent) bonusComponent: TimeBonusComponent;

  ngOnInit(): void {}
}
