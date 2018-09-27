import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnergyClaimPage } from './energy-claim';

@NgModule({
  declarations: [
    EnergyClaimPage,
  ],
  imports: [
    IonicPageModule.forChild(EnergyClaimPage),
  ],
})
export class EnergyClaimPageModule {}
