import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Weather } from '../model/weather';
import { openwWatherMap } from '../config/openweathermap';
import { BaseService } from './base.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WeatherService extends BaseService {
  constructor(private http: Http) {
      super();
  }


    /* Get the current weather
     * @param {string} city - The desired city
     * @return {Promise} - A Promise of weather Object
     */
  getCurrentWeather(city: string): Promise <Weather> {
    return this.http.get(`${openwWatherMap.baseUrl}${openwWatherMap.currenWeather}?q=${city}&appid=${openwWatherMap.apiKey}`)
           .toPromise()
           .then(response => response.json().weather[0] as Weather)
           .catch(this.handleError);
  }


  getForecast(city: string): Promise <Weather[]> {
    /* Get the forecast for the 3 next days
    * @param {string} city - The desired city
    * @return {Promise} - A Promise of weather Array
    */
    return this.http.get(`${openwWatherMap.baseUrl}${openwWatherMap.forecast}?q=${city}&appid=${openwWatherMap.apiKey}&cnt=${openwWatherMap.forecastLimit}`)
           .toPromise()
           .then((response) => {
             const weathers = response.json().list.map((weatherData, index) => {
                  return weatherData.weather[0];
             });
             return weathers as Weather[];
          })
          .catch(this.handleError);
  }
}
