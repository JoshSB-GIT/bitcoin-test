import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BitcoinvalueService } from '../services/bitcoinvalue.service';
import { CurrencyValue } from '../models/CurrencyValue.model';
import { Subscription, interval } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { OfflinemodeService } from '../services/offlinemode.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public offlineMessage: string = '';
  public offlineTitle: string = '';
  public bitcoinPrices!: CurrencyValue;
  public bitcoinPriceNow: number = 0;
  public bitcoinPricePrevious: number = 0;
  public bitcoinDataForTwoWeeks: any;
  private refreshInterval: Subscription = new Subscription();

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor(
    private bitcoinValueService: BitcoinvalueService,
    private offlinemodeService: OfflinemodeService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();

    this.loadLocalData();

    this.refreshData();
    this.info2Weeks();
    this.refreshInterval = interval(15000).subscribe(() => {
      this.refreshData();
      // this.info2Weeks();
    });
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  private async refreshData() {
    this.bitcoinValueService.getBitCoinPices().subscribe(
      (prices: CurrencyValue) => {
        this.bitcoinPricePrevious = this.bitcoinPriceNow;
        this.bitcoinPrices = prices;
        this.bitcoinPriceNow = this.bitcoinPrices.USD;

        this.storage.set('bitcoinPriceNow', this.bitcoinPriceNow);
        this.offlineMessage = '';
        this.offlineTitle = '';
      },
      (error) => {
        this.loadLocalData();
        this.offlineMessage = 'no hay conexión a internet';
        this.offlineTitle = 'OFFLINE';
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
        this.storage.set('bitcoinDataForTwoWeeks', this.bitcoinDataForTwoWeeks);
      },
      (error) => {
        this.loadLocalData();
      }
    );
  }

  public isPriceIncreasing(): boolean {
    return this.bitcoinPriceNow > this.bitcoinPricePrevious;
  }

  private loadLocalData() {
    this.storage.get('bitcoinPriceNow').then((price) => {
      if (price !== null) {
        this.bitcoinPriceNow = price;
      }
    });

    this.storage.get('bitcoinDataForTwoWeeks').then((data) => {
      if (data !== null) {
        this.bitcoinDataForTwoWeeks = data;
      }
    });
  }
}
