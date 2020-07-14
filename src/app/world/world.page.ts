import { Component, OnInit, ViewChild, ElementRef, ModuleWithProviders, Pipe  } from '@angular/core';
import { WorldDataService} from '../services/world-data.service';
import * as moment from 'moment';
import { Chart } from 'chart.js';
import { IGLobalCount } from '../models/IGLobalCount';
import { ICountry } from '../models/ICountry';
import { resolve } from 'url';
import { ICountryCodeNames } from '../models/ICountryCodeNames';
import { LoaderService } from '../services/loader.service';
// import codesToCountryNames from '../../datafiles/Country3Codes.json';

@Component({
  selector: 'app-world',
  templateUrl: './world.page.html',
  styleUrls: ['./world.page.scss'],
})


export class WorldPage implements OnInit {
  @ViewChild("barCanvas", { static: true }) barCanvas: ElementRef;
  @ViewChild("doughnutCanvas", { static: true }) doughnutCanvas: ElementRef;
  
  private barChart: Chart;
  private doughnutChart: Chart;

  confirmed;
  recovered;
  deaths;

  public globalData: IGLobalCount;
  private countryWiseData: ICountry[];

  date = moment().format('MMMM Do')
  
  slideOpts = {
    initialSlide: 1,
    speed: 50,
    slideShadows: true,
    loop: true,
    autoplay: true
  };



  constructor(private worldDataService: WorldDataService, private ionLoader: LoaderService) { }

   ngOnInit() {
  
     this.ionLoader.showLoader();

     this.worldDataService.getGlobalCount().subscribe(data => {
       this.globalData = data
       this.confirmed = this.globalData.result.confirmed
       this.recovered = this.globalData.result.recovered
       this.deaths = this.globalData.result.deaths
       this.showPieChart(this.globalData);
     });
     
     this.worldDataService.getCountryWiseData().subscribe(data => {
       this.countryWiseData = data;
       this.ionLoader.hideLoader();

       let sortedResult =this.countryWiseData;
       sortedResult.sort((a: Object, b: Object) => {
         return (Object.values(a)[0].confirmed > Object.values(b)[0].confirmed ? -1 : (Object.values(a)[0].confirmed < Object.values(b)[0].confirmed ? 1 : 0));
       });

      //  sortedResult.map(data => 
        // this.myMap.set(data.country, data.country.)
       
       this.countryWiseData = sortedResult;
     })

   }
  
  
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WorldPage,
      providers: []
    };
  }
  
  showPieChart(data:IGLobalCount): void{
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ['Confirmed', 'Recovered', 'Deaths'],
        datasets: [
          {
            data: [data.result.confirmed, data.result.recovered, data.result.deaths],
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
      }
    });

  }

  getCountryWiseData(): void {
    this.worldDataService.getCountryWiseData()
    .subscribe(data => this.recovered = data);
  }


  //Async await example
  // getGlobalData(): void {
  //   let globalData = this.httpDataProviders.getAsyncGlobalData()
  //     .then(response => this.result = response);
    
  //   // console.log(globalData)
  // }

  // countryCodesToNames(code: any): any {
  //   let country: ICountryCodeNames = codesToCountryNames[codesToCountryNames.map(item => { return item.code; }).indexOf(props.code)];
  //   return country ? country.name : props.code;
  // }
}



