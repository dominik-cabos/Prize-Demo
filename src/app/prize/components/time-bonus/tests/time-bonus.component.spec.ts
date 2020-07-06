import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TimeBonusComponent} from '../time-bonus.component';
import {TimePipe} from '../../../pipes/time.pipe';

describe('TimeBonusComponent', () => {
  let component: TimeBonusComponent;
  let fixture: ComponentFixture<TimeBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeBonusComponent, TimePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
