import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    NgApexchartsModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
