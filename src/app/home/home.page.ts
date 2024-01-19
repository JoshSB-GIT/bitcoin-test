import { Component } from '@angular/core';
import { BitcoinvalueService } from '../services/bitcoinvalue.service';
import { CurrencyValue } from '../models/CurrencyValue.model';
import { BitcoinData } from '../models/bit-coin.model';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  bitcoinPrices!: CurrencyValue;
  bitcoinPriceNow: number = 0;
  bitcoinDataForTwoWeeks!: BitcoinData;
  private refreshInterval: Subscription = new Subscription();

  constructor(private bitcoinValueService: BitcoinvalueService) {}

  ngOnInit() {
    this.refreshData();
    this.refreshInterval = interval(15000).subscribe(() => {
      this.refreshData();
    });
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  private refreshData() {
    // Llamada al servicio para obtener precios de Bitcoin
    this.bitcoinValueService.getBitCoinPices().subscribe(
      (prices: CurrencyValue) => {
        this.bitcoinPrices = prices;
        this.bitcoinPriceNow = this.bitcoinPrices.USD;
        console.log(this.bitcoinPrices.USD);
        

        // Llamada al servicio para obtener datos de Bitcoin para las últimas dos semanas
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

        this.bitcoinValueService.get2Weeks(twoWeeksAgo).subscribe(
          (data: BitcoinData) => {
            this.bitcoinDataForTwoWeeks = data;
          },
          (error) => {
            console.error(
              'Error obteniendo datos de Bitcoin para las últimas dos semanas:',
              error
            );
          }
        );
      },
      (error) => {
        console.error('Error obteniendo precios de Bitcoin:', error);
      }
    );
  }
}
