import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { CityService } from './services/city.service';
import { Weather } from './model/weather';
import { City } from './model/city';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService, CityService],
})

export class AppComponent implements OnInit {
  title = 'app';
  weather: Weather;
  forecastWeather: Weather[];
  cities: City[] = [];
  cityInput: string;

  /* Constuctor
   * @param {WeatherService} weatherService
   * @param {CityService} cityService
   */
  constructor(
    private weatherService: WeatherService,
    private cityService: CityService,
  ) {}

  ngOnInit(): void {
    this.cityService.getCities()
        .then(response => this.cities = response)
        .then(() => {
          this.cityInput = this.cities[0].nm;
          this.getWeatherAndForecast(this.cityInput);
        });
  }

  getWeatherAndForecast(cityName: string): void {
    Observable.forkJoin([
      this.weatherService.getCurrentWeather(cityName),
      this.weatherService.getForecast(cityName)
    ]).subscribe(([currentWeather, forecastWeather]) => {
          this.weather = currentWeather;
          this.forecastWeather = forecastWeather;
    });
  }
}
