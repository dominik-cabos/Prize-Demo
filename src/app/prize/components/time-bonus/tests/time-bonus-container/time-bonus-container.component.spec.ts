import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TimeBonusContainerComponent } from './time-bonus-container.component';
import { TimeBonusComponent } from '../../time-bonus.component';
import { TimePipe } from '../../../../pipes/time.pipe';
import { BONUS_SAMPLE_HTTP } from './bonus.sample';
import { SimpleChange } from '@angular/core';

describe('TimeBonusContainerComponent', () => {
  let component: TimeBonusContainerComponent;
  let fixture: ComponentFixture<TimeBonusContainerComponent>;
  let topWrapper: HTMLElement;
  let claimButton: HTMLElement;
  let doneButton: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeBonusContainerComponent, TimeBonusComponent, TimePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeBonusContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.bonusComponent.bonusData = BONUS_SAMPLE_HTTP;
    topWrapper = fixture.nativeElement.querySelector('.flip');
    claimButton = fixture.nativeElement.querySelector('button');
    doneButton = fixture.nativeElement.querySelector(
      '.bonus-panel.confirm button'
    );
    fixture.detectChanges();
  });

  it('should display the bonus panel when bonus data is provided', () => {
    const bonusInfo = fixture.nativeElement.querySelector(
      '.bonus-panel h1.info'
    ).innerHTML;
    expect(bonusInfo).toContain(BONUS_SAMPLE_HTTP.amount);
    expect(bonusInfo).toContain(BONUS_SAMPLE_HTTP.game);
    expect(bonusInfo).toContain(BONUS_SAMPLE_HTTP.prize);
    expect(topWrapper).not.toHaveClass('claimed');
  });

  it('should inform through event when bonus is claimed', fakeAsync(() => {
    spyOn(component.bonusComponent.bonusClaim, 'emit');
    claimButton.click();
    tick();
    fixture.detectChanges();
    expect(component.bonusComponent.bonusClaim.emit).toHaveBeenCalled();
    expect(topWrapper).toHaveClass('claimed');
  }));

  it('should inform through event when bonus times out', fakeAsync(() => {
    spyOn(component.bonusComponent.bonusTimeout, 'emit');
    component.bonusComponent.ngOnChanges(SimpleChange);
    component.bonusComponent.countdown$.subscribe((_) => {});
    tick(BONUS_SAMPLE_HTTP.countdown * 1001);
    expect(component.bonusComponent.bonusTimeout.emit).toHaveBeenCalled();
  }));

  it('should inform through event when user closes', fakeAsync(() => {
    spyOn(component.bonusComponent.bonusClose, 'emit');
    doneButton.click();
    tick();
    fixture.detectChanges();
    expect(component.bonusComponent.bonusClose.emit).toHaveBeenCalled();
    expect(component).toBeTruthy();
  }));
});
