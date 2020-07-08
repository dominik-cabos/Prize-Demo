import {TestBed} from '@angular/core/testing';
import {BonusService} from './bonus.service';
import {BONUS_SAMPLE_HTTP} from '../prize/components/time-bonus/tests/time-bonus-container/bonus.sample';
import {HttpClientTestingModule, HttpTestingController,} from '@angular/common/http/testing';

describe('BonusService', () => {
  let httpTestingController: HttpTestingController;
  let service: BonusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BonusService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BonusService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a Bonus when a matching response comes from the Http adapter', () => {
    service.getBonus().subscribe((bonus) => {
      expect(bonus).toEqual(BONUS_SAMPLE_HTTP);
    });

    const req = httpTestingController.expectOne('assets/bonus.json');
    req.flush(BONUS_SAMPLE_HTTP);

    expect(service).toBeTruthy();
  });

  it('should throw an Error when there\'s a problem with Http', () => {
    service.getBonus().subscribe(
      (bonus) => {
        expect(false).toBeTruthy();
      },
      (err) => {
        expect(err.message).toContain('Http');
      }
    );
    const req = httpTestingController.expectOne('assets/bonus.json');
    req.error(new ErrorEvent('Oooops.'));
  });
});
