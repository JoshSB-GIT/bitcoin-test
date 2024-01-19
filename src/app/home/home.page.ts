import { Component } from '@angular/core';
import { BitcoinvalueService } from '../services/bitcoinvalue.service';
import { CurrencyValue } from '../models/CurrencyValue.model';
import { BitcoinData } from '../models/bit-coin.model';
import { Subscription, interval } from 'rxjs';
import { elements } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public bitcoinPrices!: CurrencyValue;
  public bitcoinPriceNow: number = 0;
  public bitcoinPricePrevious: number = 0;
  public bitcoinDataForTwoWeeks: any;
  private refreshInterval: Subscription = new Subscription();

  constructor(private bitcoinValueService: BitcoinvalueService) {}

  ngOnInit() {
    this.refreshData();
    this.info2Weeks();
    this.refreshInterval = interval(15000).subscribe(() => {
      this.refreshData();
    });

    // console.log(this.bitcoinDataForTwoWeeks);
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  private refreshData() {
    this.bitcoinValueService.getBitCoinPices().subscribe(
      (prices: CurrencyValue) => {
        this.bitcoinPricePrevious = this.bitcoinPriceNow;
        this.bitcoinPrices = prices;
        this.bitcoinPriceNow = this.bitcoinPrices.USD;
      },
      (error) => {
        console.error('Error obteniendo precios de Bitcoin:', error);
      }
    );
  }

  private convertirFechas(data: any[]): void {
    data.forEach((item: any) => {
      const timestampInSeconds = item.time;
      const fecha = new Date(timestampInSeconds * 1000);
      item.time = fecha.toLocaleDateString();
    });
  }

  private invertirArray(data: any[]): void {
    this.bitcoinDataForTwoWeeks = data.reverse();
  }

  private info2Weeks() {
    const _cop = 3921;
    const _eur = 0.92;
    this.bitcoinValueService.get2WeeksClose('USD').subscribe(
      (data: any) => {
        this.bitcoinDataForTwoWeeks = data.Data.Data;
        this.convertirFechas(this.bitcoinDataForTwoWeeks);
        this.invertirArray(this.bitcoinDataForTwoWeeks);

        this.bitcoinDataForTwoWeeks.forEach((item: any) => {
          item['closeCOP'] = (item.close * _cop).toFixed(2);
          item['closeEUR'] = (item.close * _eur).toFixed(2);
        });
        console.log(this.bitcoinDataForTwoWeeks);
      },
      (error) => {
        console.error('Error obteniendo precios de Bitcoin:', error);
      }
    );
  }

  public isPriceIncreasing(): boolean {
    return this.bitcoinPriceNow > this.bitcoinPricePrevious;
  }
}
