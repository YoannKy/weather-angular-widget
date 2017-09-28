import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { City } from '../model/city';
import { BaseService } from './base.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CityService extends BaseService {
  constructor(private http: Http) {
      super();
  }

  /* Get the list of cities
   * @param none
   * @return {Promise} - A Promise of city Array
   */
  getCities(): Promise <City[]> {
    return this.http.get(`assets/cities.json`)
         .toPromise()
         .then(response => response.json() as City[])
         .catch(this.handleError);
  }
}
