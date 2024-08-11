import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface Companies {
  id: number,
  companyName?: string,
  createdDate?: Date,
  code?: string,
  sharePrice?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  public companies: Companies[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
    this.getCompanies();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public getCompanies(): void {
    this.http.get<Companies[]>('/companies').subscribe({
      next: (results) => {
        this.companies = results;
        console.log(this.companies);
      },
      error: (error) => { console.error(error); }
    })
  }

  title = 'downinginterviewproject.client';
}
