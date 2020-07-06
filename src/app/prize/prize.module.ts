import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeBonusComponent } from './components/time-bonus/time-bonus.component';
import { TimeBonusContainerComponent } from './components/time-bonus/tests/time-bonus-container/time-bonus-container.component';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  declarations: [TimeBonusComponent, TimeBonusContainerComponent, TimePipe],
  exports: [TimeBonusComponent],
  imports: [CommonModule],
})
export class PrizeModule {}
