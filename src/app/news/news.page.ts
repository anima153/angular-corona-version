import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { LoaderService } from '../services/loader.service';
// import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {


  public iArticles: IArticles[];

  constructor(private newsService: NewsService, private ionLoader: LoaderService) { }

  ngOnInit() {
    this.ionLoader.showLoader();
    this.newsService.getArticlesData().subscribe((data) => {
      this.iArticles = data;
      this.ionLoader.hideLoader();
    });
  }

  openBrowser(url) {
    // this.iab.create(url);
    window.open(url, '_system');
  }


  trimSourceDetails(source: any): String {
    return (source!=null) ? ((source.split(' ')[1]!=null) ? source.split(' ')[0] + ' ' + source.split(' ')[1] : source.split(' ')[0]) : source;
    }
    
  }

