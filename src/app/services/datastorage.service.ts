// data-storage.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private jsonFileName = 'data.json';

  constructor(private http: HttpClient) {}

  saveData(data: any){
  }

  getData(): Observable<any> {
    return this.http.get(this.jsonFileName);
  }
}
