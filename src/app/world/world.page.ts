import { Component, OnInit } from '@angular/core';
import {WorldDataService} from '../world-data.service'
import * as moment from 'moment';


@Component({
  selector: 'app-world',
  templateUrl: './world.page.html',
  styleUrls: ['./world.page.scss'],
})
export class WorldPage implements OnInit {

  date = moment().format('MMMM Do')
  
  slideOpts = {
  initialSlide: 1,
  speed: 50,
  slideShadows: true,
  loop: true,
  autoplay: true
};

  constructor(private worldDataService: WorldDataService) { }

  ngOnInit() {

    this.getGlobalData()
  }


  getGlobalData(): void {
    const result = this.worldDataService.getGLobalCount()

    console.log(result)
  }


}


