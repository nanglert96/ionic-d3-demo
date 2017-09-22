import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarDatum } from '../../components/bar-chart/bar-chart';
import { DataProvider, ProviderData, ProviderDatum } from '../../providers/data/data';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private data: BarDatum[];
  private apiData: Observable<ProviderData>;
  private cycler: any;

  constructor(public navCtrl: NavController, private api: DataProvider) {
    this.apiData = api.bars();

    this.apiData.subscribe(
      (pd: ProviderData) => {
        let i = 0;
        this.cycler = setInterval(() => {
          this.data = pd.data[i].bars;
          i = i === pd.data.length - 1 ? 0 : i += 1;
        }, 3000);
      }
    )
  }

}
// feathers generate app (edit config to port 80)
// feathers generate service (memory, bars)
// sudo npm start
// curl http://api.smartclickr.dev.com/bars/ -H 'Content-Type: application/json' --data-binary '[{"bars": [{"x":"red","y":3}, {"x":"blue", "y": 5}, {"x":"green","y":4}, {"x":"orange","y":7}]},{"bars": [{"x":"Test #1","y":93}, {"x":"Test #2", "y": 85}, {"x":"Project","y":84}, {"x":"Quizzes","y":97}, {"x":"HW","y":67}]},{"bars": [{"x":"drummers","y":12}, {"x":"pipers", "y": 11}, {"x":"lords","y":10}, {"x":"ladies","y":9}, {"x":"maids","y":8}, {"x":"swans","y":7}, {"x":"geese", "y": 6}, {"x":"rings","y":5}, {"x":"birds","y":4}, {"x":"hens", "y":3}, {"x":"doves", "y": 2}, {"x":"partridge","y":1}]},{"bars": [{"x":"never","y":1}, {"x":"occasionally", "y": 3}, {"x":"sometimes","y":5}, {"x":"regularly","y":7}, {"x":"often", "y": 5}, {"x":"usually","y":3}, {"x":"always","y":1}]}]'