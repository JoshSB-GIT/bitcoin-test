import { Injectable } from '@angular/core';
import { cryptocompare } from './environment';

@Injectable({
  providedIn: 'root'
})
export class BitcoinvalueService {

  private URL = cryptocompare.apiUrl

  constructor() { }
}
