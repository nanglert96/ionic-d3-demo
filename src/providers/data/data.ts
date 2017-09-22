import { Injectable } from '@angular/core';
import { FeathersProvider } from '../feathers/feathers';
import { BarDatum } from '../../components/bar-chart/bar-chart';
import { Observable } from 'rxjs/Observable';

export interface ProviderData {
  total: number;
  limit: number;
  skip: number;
  data: ProviderDatum[];
}

export interface ProviderDatum {
  bars: BarDatum[];
  id: number;
}

@Injectable()
export class DataProvider {

  constructor(private feathers: FeathersProvider) {}

  bars(): Observable<ProviderData> {
    return this.feathers
               .service('bars')
               .watch()
               .find({
                 query: {
                   $sort: {
                     createdAt: -1
                   },
                   $limit: 25,
                 }
               });
  } 
}
