import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CountryDataService } from '../services/country-data.service';
import * as Chart from 'chart.js';
// import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { WorldDataService } from '../services/world-data.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {
  @ViewChild("barCanvas", { static: true }) barCanvas: ElementRef;
  @ViewChild("countrydoughnutCanvas", { static: true }) doughnutCanvas: ElementRef;

  customPopoverOptions = {
    header: 'Select your country',
    translucent: false
  };

  private barChart: Chart;
  private doughnutChart: Chart;

  public confirmed;
  public recovered;
  public deaths;
  public yourCountry = "IND";

  private countryData: ICountryCount;
  private caseData: ICases;
  private countryTimeSeriesData: ISeriesCases[];


  constructor(private countryDataService: CountryDataService,
    private worldDataService: WorldDataService, private ionLoader: LoaderService) { }

  ngOnInit() {
    // this.storage.set("yourCountry", this.yourCountry);
    // this.storage.get('yourCountry').then((data) => { this.yourCountry = data; });
    this.updateCountryData(this.yourCountry)
    
  }

  updateCountryData(country) {
    this.ionLoader.showLoader();

    // this.storage.get('yourCountry').then((data) => { this.yourCountry = data; });
    this.yourCountry = country;    
    let endDate: string = new Date().toISOString().split('T')[0];
    let todaysDate = new Date();
    let startDate: string = new Date(todaysDate.getTime() - (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    
    this.showCountryPieChartData(this.yourCountry)
    this.showCountryTimeSeriesData(this.yourCountry, startDate, endDate); 
  }

  showCountryTimeSeriesData(country: String,startDate,endDate) {
    this.countryDataService.getcountryTimeSeriesData(country, startDate, endDate).subscribe(data => {
      let dateArr: Array<String> = [];
      let confirmedArr: Array<Number> = [];
      let recoveredArr: Array<Number> = [];
      let deathsArr: Array<Number> = [];

      this.countryTimeSeriesData = data["result"];

      this.countryTimeSeriesData.forEach((ele, idx) => {
        dateArr.push(ele.date);
        confirmedArr.push(ele.confirmed);
        recoveredArr.push(ele.recovered);
        deathsArr.push(ele.deaths);
      });

      this.showBarChart(dateArr, confirmedArr, recoveredArr, deathsArr);
      this.ionLoader.hideLoader();

    });
  }


  showCountryPieChartData(country: String) {
    this.countryDataService.getCountryData(country).subscribe(data => {
      this.countryData = data
      this.confirmed = this.worldDataService.getValues(this.countryData.result)[0]["confirmed"]
      this.recovered = this.worldDataService.getValues(this.countryData.result)[0]["recovered"]
      this.deaths = this.worldDataService.getValues(this.countryData.result)[0]["deaths"]
      this.showPieChart();
    });
  }


  showBarChart(dateArr, confirmedArr, recoveredArr, deathsArr): void{
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: [moment(dateArr[0]).format('MMMM Do'), moment(dateArr[1]).format('MMMM Do'), moment(dateArr[2]).format('MMMM Do'), moment(dateArr[3]).format('MMMM Do'), moment(dateArr[4]).format('MMMM Do')],
        datasets: [
          {
            label: 'Confirmed',
            backgroundColor: '#4399F6',
            borderColor: '#007bff',
            borderWidth: 1,
            data: [confirmedArr[0], confirmedArr[1], confirmedArr[2], confirmedArr[3], confirmedArr[4]]
          },
          {
            label: 'Recovered',
            backgroundColor: '#37EA61',
            borderColor: '#127729',
            borderWidth: 1,
            data: [recoveredArr[0], recoveredArr[1], recoveredArr[2], recoveredArr[3], recoveredArr[4]]
          },
          {
            label: 'Deaths',
            backgroundColor: '#F34943',
            borderColor: '#ff073a',
            borderWidth: 1,
            data: [deathsArr[0], deathsArr[1], deathsArr[2], deathsArr[3], deathsArr[4]]
          }
        ]
      },
      options:{
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        },
        title: {
          display: true,
          text: 'Cases in the current week',
          fontSize: 15
        },
        legend: {
          display: true,
          position: 'bottom'
        },
        plugins: {
          datalabels: { display: false }
        }
      }
    })
  }


  showPieChart(): void {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ['Confirmed', 'Recovered', 'Deaths'],
        datasets: [
          {
            data: [this.confirmed, this.recovered, this.deaths],
            label: 'Covid-19',
            backgroundColor: [
              '#4399F6',
              '#37EA61',
              '#F34943'
            ],
            hoverBackgroundColor: [
              '#007bff',
              '#127729',
              '#ff073a'
            ]
          }
        ]
      },
      options: {
        legend: {
          display: true,
          position: 'right'
        },
        plugins: {
          datalabels: {
            anchor: 'bottom',
            clamp: 'true',
            align: 'end',
            color: 'black',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size: 10
                }
              }
            }
          }
        }
      }
    });
  
  }

}
