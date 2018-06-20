import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-token-galery',
  templateUrl: 'token-galery.html',
})
export class TokenGaleryPage {
  pages = 3;
  imgPerPage = 9;
  currentPage = 0;
  //
  dummyCounter : number;
  tokenGallery: any [];
  allGallery = new Array(this.pages);
  constructor(private viewCtrl: ViewController) {
 
  }
  //TODO: LLEMARLO CON IMAGENES!
  ionViewDidLoad() {
    console.log('ionViewDidLoad TokenGaleryPage');
    this.tokenGallery = [1,2,3,4,5,6,7,8,9]
       //inicializacion de la galeria con dummy data
    this.dummyCounter = 1;
    console.log(this.dummyCounter);
    
    for (var i = 0; i < this.pages; i++) {
      this.allGallery[i] = new Array(this.imgPerPage);
      for (var j = 0; j < this.imgPerPage; j++) {
        this.allGallery[i][j] = this.dummyCounter++;
      }
    }
    console.log(this.allGallery);
    
  }

  onClose(){
    this.viewCtrl.dismiss();
  }

  onNextPage(){
    console.log("antes de paginar: "+this.currentPage);
    
    if(this.currentPage < this.pages-1){
      this.currentPage++;
      console.log("despues de paginar: "+this.currentPage);
      this.tokenGallery = this.allGallery[this.currentPage];
    }
  }

  onPreviousPage(){
    if(this.currentPage > 0){
      this.currentPage--;
      this.tokenGallery = this.allGallery[this.currentPage];
    }
  }
}
