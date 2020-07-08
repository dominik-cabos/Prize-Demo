import {async, ComponentFixture, fakeAsync, TestBed, tick,} from '@angular/core/testing';
import {AppComponent} from '../app.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Bonus} from '../prize/models/bonus';
import {Subject} from 'rxjs';
import {BonusService} from '../services/bonus.service';
import {BONUS_SAMPLE_SERVICE} from './mocks';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let bonusContainer: HTMLElement;

  const mockBonusResponse = new Subject<Bonus>();
  const mockBonusService = jasmine.createSpyObj(['getBonus']);
  mockBonusService.getBonus.and.returnValue(mockBonusResponse.asObservable());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: BonusService, useValue: mockBonusService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    fixture.detectChanges();

    mockBonusResponse.next(BONUS_SAMPLE_SERVICE);
    bonusContainer = fixture.nativeElement.querySelector('.bonus-container');
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todays-prize'`, () => {
    expect(app.title).toEqual('todays-prize');
  });

  it('should show the bonus when ready', () => {
    fixture.detectChanges();
    expect(bonusContainer).toHaveClass('show-bonus');
  });

  it('should display an error message when the  service has malfunctioned', fakeAsync(() => {
    mockBonusResponse.error('Oooops.');
    fixture.detectChanges();

    expect(app.error).toBeTruthy();
    tick(app.getAlertTimeout + 1000);
    expect(app.error).toBeFalsy();
  }));

  it('should reload the page when clicked on the reload button', () => {
    app.getLocationObject();
    spyOn(app, 'getLocationObject').and.returnValue({
      reload: () => {
        console.log('fake reload');
      },
    });

    spyOn(app.getLocationObject(), 'reload');

    app.reload();

    expect(app.getLocationObject().reload).toHaveBeenCalled();
  });

  it('should hide the bonus when finishBonus() is called', () => {
    app.finishBonus();
    fixture.detectChanges();
    expect(bonusContainer).not.toHaveClass('show-bonus');
  });
});
