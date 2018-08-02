import { Component, Injectable, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vr-custom-sidemenu',
  templateUrl: 'vr-custom-sidemenu.html'
})
@Injectable()
export class VrCustomSidemenuComponent {
  
  @Output() sideMenuOpenEmmiter = new EventEmitter<boolean>();
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
  currentActiveMenu: string;
  menus: string[] = ['settings', 'settings-info', 'user-login','user-account', 'user-create', 'user-tokens', 'user-rankings'];
  activeButtons: boolean[];

  //Color del Sidebar al abrir y cerrar el sideNav
  opaque = "rgba(0,0,0,0.4)"
  transparent = "transparent";
  //Variable para hacer property binding
  sidebarOpacity: string;
  //sidebarWidth: number;
  timeout: any;
  fullyOpen: boolean;
  constructor() 
    {
    console.log('Hello VrCustomSidemenuComponent Component');
    //[0:'settings', 1:'settings-info', 2:'user-login' - 'user-create' y 'user-account', 3:'user-tokens', 4:'user-rankings'];
    this.activeButtons =  [true, false, true, false, false];//solo hay 5 pestañas ya que user y create comparten la misma
    console.log(this.activeButtons);
    //this.sidebarWidth = 0;
    this.navWidth = 0;
    this.sidePos = 0;
    this.isOpen = false;
    this.sidebarOpacity = this.transparent;
    //Settings and subcat
    this.settingsBtnActive = true;
    this.settingSubActive = false;
    //user and subcatd
    this.userBtnActive = true;
    this.userSubActive = false;
    //Menu actualmente activo
    this.currentActiveMenu = 'settings'
    this.fullyOpen = false;
  }

  openNav() {
    this.navWidth = 85;
    this.sidePos = 85;
    //this.sidebarWidth = 15;
    this.toggleOpen();
    
    this.timeout = setTimeout(() => {
      this.fullyOpen = true; 
    }, 300);
  }

  closeNav() {
    this.navWidth = 0;
    this.sidePos = 0;
    //this.sidebarWidth = 0;
    this.enableAllCategories();
    this.disableAllSubCategories();
    this.toggleOpen();
    this.setToOriginalState();
    this.fullyOpen = false;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.sidebarOpacity = this.opaque;
    } else {
      this.sidebarOpacity = this.transparent;
    }

    this.sideMenuOpenEmmiter.emit(this.isOpen);
  }
  //Settings view Deployment
  openSettingsCategory() {
    if (!this.isOpen) {
      this.openNav();
      //disable user
      this.userBtnActive = false;
      this.disableAllSubCategories();
      //enable settings subcat
      this.settingSubActive = true;
    }
    this.setToOriginalState();
    this.setCurrentActiveMenu('settings');
  }

  openImportantInfoView(){
    this.setCurrentActiveMenu('settings-info');
    this.activateButton(1);
  }
  //User view deployment
  openUserCategory() {
    if(!this.isOpen){
      this.openNav();
      this.settingsBtnActive = false;
      this.disableAllSubCategories();
      this.userSubActive = true;
    }
    this.setToOriginalState();
    this.setCurrentActiveMenu('user-login');
  }
  
  openCreateUserView(value: string){
    this.setCurrentActiveMenu(value);
    this.setToOriginalState();
  }

  openTokensView(){
    this.setCurrentActiveMenu('user-tokens');
    this.activateButton(3);
  }

  openRankingView(){
    this.setCurrentActiveMenu('user-rankings');
    this.activateButton(4);
  }

  //Enable and disable sidemenu buttons states
  enableAllCategories() {
    this.settingsBtnActive = true;
    this.userBtnActive = true;
  }

  disableAllSubCategories(): any {
    this.settingSubActive = false;
    this.userSubActive = false;
  }

  //Current Active menu to show on the sideNav
  setCurrentActiveMenu(currMenu: string){
    console.log(currMenu);
    
    this.currentActiveMenu = currMenu;
  }

  deactivateAllButtons(){
    for (let index = 0 ; index < this.activeButtons.length; index++) {
      this.activeButtons[index] = false;
    }
  }

  setToOriginalState(){
    this.activeButtons =  [true, false, true, false, false];
  }

  activateButton(index: number){
    this.deactivateAllButtons();
    this.activeButtons[index] = true;
    //console.log(this.activeButtons);   
  }

  clickOnNav(event){
    console.log(event.target.id);
    if(event.target.id === "custom-sidenav" && this.isOpen){
      console.log("click outside",true);
      this.closeNav();
    }
  }
}
