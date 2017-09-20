import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarDatum } from '../../components/bar-chart/bar-chart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private data: BarDatum[];

  constructor(public navCtrl: NavController) {
    this.data = [{x:'red',y:3}, {x:'blue', y: 5}, {x:'green',y:4}, {x:'orange',y:7}];
  }

}
