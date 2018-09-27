import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, LoadingController } from 'ionic-angular';
import { AdmobServiceProvider } from '../../providers/admob-service/admob-service';

/**
 * Generated class for the EnergyClaimPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-energy-claim',
  templateUrl: 'energy-claim.html',
})
export class EnergyClaimPage {

  constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            private admob : AdmobServiceProvider,
            private platform : Platform,
            private events : Events,
            ) {
            admob.isEnergyClaimPage = true; //para avisar que lance en evento
            this.platform.ready().then(()=>{

              this.admob.prepareVideoAdd();
              //console.log(true);
              
            });

            this.events.subscribe(('vrloaded:true'),()=>{
              this.admob.showVideRewardAdd().onAdDismiss().subscribe(()=>{
                //this.admob.dismissLoader();
                this.navCtrl.pop({animate:false});
                
              },
            e=>{
                console.log(e);
                //this.admob.dismissLoader();
                this.navCtrl.pop({animate:false});
              
              })
            })
            
  }

  ionViewDidLoad() {
    this.admob.presentLoaderSpinner();
    console.log('ionViewDidLoad EnergyClaimPage');
  }

  ionViewWillLeave(){
    this.admob.dismissLoader();
  }

}
