import { Component } from '@angular/core';

@Component({
  selector: 'vr-custom-sidemenu',
  templateUrl: 'vr-custom-sidemenu.html'
})

export class VrCustomSidemenuComponent {

  //parametros para desplegar el sideNav y reposicionar el sidebar
  navWidth: number;
  sidePos: number;
  isOpen: boolean;
  //Settings 
  settingsBtnActive: boolean;
  settingSubActive: boolean;
  //User
  userBtnActive: boolean;
  userSubActive: boolean;
  
  //Menu activo actual para saber que vista rendeizar
  currentActiveMenu : string;
  menus : string[] = ['settings','settings-info','user-login','user-create','user-tokens','user-rankings'];

  //Color del Sidebar al abrir y cerrar el sideNav
  opaque = "rgba(0,0,0,0.4)"
  transparent = "transparent";
  //Variable para hacer property binding
  sidebarOpacity : string ;

  constructor() {
    console.log('Hello VrCustomSidemenuComponent Component');
    this.navWidth = 0;
    this.sidePos = 0;
    this.isOpen = false;
    this.sidebarOpacity = this.transparent;
    //Settings and subcat
    this.settingsBtnActive= true;
    this.settingSubActive = false;
    //user and subcatd
    this.userBtnActive = true;
    this.userSubActive = false;
  }

  openNav(){
    this.navWidth= 80;
    this.sidePos = 80;
    this.toggleOpen();
  }

  closeNav(){
    this.navWidth = 0;
    this.sidePos = 0;
    this.enableAllCategories();
    this.disableAllSubCategories();
    this.toggleOpen();
  }

  toggleOpen(){
    this.isOpen = !this.isOpen;
    if(this.isOpen){
      this.sidebarOpacity = this.opaque;
    }else{
      this.sidebarOpacity = this.transparent;
    }
  }

  openSettingsCategory(){
    this.openNav();
    //disble user
    this.userBtnActive = false;
    this.disableAllSubCategories();
    //enable settings subcat
    this.settingSubActive = true;
  }

  openUserCategory(){
    this.openNav();
    this.settingsBtnActive = false;
    this.disableAllSubCategories();
    this.userSubActive = true;
  }

  enableAllCategories(){
    this.settingsBtnActive = true;
    this.userBtnActive = true;
  }

  disableAllSubCategories(): any {
    this.settingSubActive = false;
    this.userSubActive = false;
  }

}
