export class BitcoinData {
  time: number;
  high: number;
  low: number;
  open: number;
  volumefrom: number;
  volumeto: number;
  close: number;
  conversionType: string;
  conversionSymbol: string;

  constructor(data: any) {
    this.time = data.time || 0;
    this.high = data.high || 0;
    this.low = data.low || 0;
    this.open = data.open || 0;
    this.volumefrom = data.volumefrom || 0;
    this.volumeto = data.volumeto || 0;
    this.close = data.close || 0;
    this.conversionType = data.conversionType || 'direct';
    this.conversionSymbol = data.conversionSymbol || '';
  }
}
