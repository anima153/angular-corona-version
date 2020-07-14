import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.page.html',
  styleUrls: ['./guidelines.page.scss'],
})
export class GuidelinesPage implements OnInit {

  constructor(private ionLoader: LoaderService) { }

ngOnInit() {
    this.ionLoader.showHideAutoLoader();
  }

}
