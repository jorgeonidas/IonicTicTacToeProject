import { Component, Input } from '@angular/core';

@Component({
  selector: 'contact',
  templateUrl: 'contact.html'
})
export class ContactComponent {
  /*
  statusEnum = Object.freeze({
    1 : 'conectado',
    2 : 'desconectado',
    3 : 'conect-otro',
    4 : 'en-partida',
    5 : 'not-friend' 
  })*/

  statusEnum = Object.freeze({
    'conectado': 1,
    'desconectado': 2,
    'conectOtro': 3,
    'enPartida': 4,
    'notFriend': 5
  })
  /*
  actionEnum = Object.freeze({
    1 : 'invite',
    2 : 'is-inviting',
    3: 'was-invited',
    4 : 'app-invite',
    5 : 'friend-request',
    6 : 'none' 
  });*/

  actionEnum = Object.freeze({
    'invite': 1,
    'is-inviting': 2,
    'was-invited': 3,
    'app-invite': 4,
    'friend-request': 5,
    'none': 6
  });

  @Input() rankingUri : string;
  @Input() nickname: string;
  @Input() lastMsjNotif: string;
  @Input() currentAction: number;
  @Input() currentStatus : number;
  

  constructor() {
    this.currentStatus = this.statusEnum.conectado;
    this.rankingUri = 'assets/imgs/medal-icon.png';
    this.nickname = 'Ollie';
    this.lastMsjNotif = 'this is a test msj';
    this.currentAction = this.actionEnum.invite;
    console.log(this.statusEnum, this.currentStatus, this.actionEnum, this.currentAction);
  }

  
}
