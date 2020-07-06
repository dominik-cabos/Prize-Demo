import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Bonus} from '../prize/models/bonus';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BonusService {
  constructor(private http: HttpClient) {}

  private errorMsg = 'Http error';

  getBonus(): Observable<Bonus> {
    const location = environment.bonusUrl;
    return this.http.get<Bonus>(location).pipe(
      catchError((_) => {
        throw new Error(this.errorMsg);
      })
    );
  }
}
