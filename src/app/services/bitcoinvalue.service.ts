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

  public get2WeeksClose(tsym: string): Observable<BitcoinData> {
    const currentDate = new Date();
    const toTs = Math.floor(currentDate.getTime() / 1000);
    console.log('now()', toTs);
    
    const limit = 14;
    const dataEndpoint = `
    ${this.URL}data/v2/histoday?fsym=BTC&tsym=${tsym}&limit=${limit}&toTs=${toTs}`;

    return this.http.get<BitcoinData>(dataEndpoint);
  }
}
