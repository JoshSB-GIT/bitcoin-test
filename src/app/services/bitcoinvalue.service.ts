import { Injectable } from '@angular/core';
import { cryptocompare } from './environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BitcoinData } from '../models/bit-coin.model';
import { CurrencyValue } from '../models/CurrencyValue.model';

@Injectable({
  providedIn: 'root',
})
export class BitcoinvalueService {
  private URL = cryptocompare.apiUrl;

  constructor(private http: HttpClient) {}

  public getBitCoinPices(): Observable<CurrencyValue> {
    const data = `${this.URL}data/price?fsym=BTC&tsyms=USD,COP,EUR`;
    return this.http.get<CurrencyValue>(data);
  }

  public get2Weeks(date: Date): Observable<BitcoinData> {
    const toTs = Math.floor(date.getTime() / 1000);

    const dataEndpoint = `${this.URL}
          /data/v2/histoday?fsym=BTC&tsym=USD&limit=14&toTs=${toTs}`;
    return this.http.get<BitcoinData>(dataEndpoint);
  }
}
