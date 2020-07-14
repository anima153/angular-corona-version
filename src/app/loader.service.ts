import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})



export class LoaderService {

  constructor(public loadingController: LoadingController) { }

//With async await example
  // async showHideAutoLoader() {

  //   const loading = await this.loadingController.create({
  //     message: 'This Loader Will Auto Hide in 2 Seconds',
  //     duration: 2000
  //   });
  //   await loading.present();

  //   const { role, data } = await loading.onDidDismiss();
  //   console.log('Loading dismissed! after 2 Seconds', { role, data });

  // }

  showHideAutoLoader() {

    this.loadingController.create({
      message: 'Please wait...',
      duration: 3000
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 3 Seconds', dis);
      });
    });
  }
  

  // Show the loader for infinite time
  showLoader() {
    this.loadingController.create({
      message: 'Please wait...',
      duration: 10000,
      translucent: true,
      backdropDismiss: true

    }).then((res) => {
      res.present();
    });

  }

  // Hide the loader if already created otherwise return error
  hideLoader() {

    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });

  }

  
}
