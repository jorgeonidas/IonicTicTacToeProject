import { Component, Input } from '@angular/core';

@Component({
  selector: 'contact',
  templateUrl: 'contact.html'
})
export class ContactComponent {

  statusEnum = Object.freeze({
    'conectado': 1,
    'desconectado': 2,
    'conectOtro': 3,
    'enPartida': 4,
    'notFriend': 5,
  })
  
  actionEnum = Object.freeze({
    'invite': 1,  //invitar a jugar
    'isInviting': 2,//ha invitado al jugador a la partida
    'wasInvited': 3,//fue invitado pero no responde
    'appInvite': 4,
    'friendRequest': 5,
    'friendRequestSent': 6,
    'none': 7
  });

  @Input() rankingUri : string;
  @Input() nickname: string;
  @Input() lastMsjNotif: string;
  @Input() currentAction: number;
  @Input() currentStatus : number;
  
  friendRequestSentNotf : string;

  @Input() MsjNotif = {
    type: 'message',
    msjReaded: true,
    msj: ''
  }

  constructor() {
    this.friendRequestSentNotf = 'Friend Request Sent';
    this.currentStatus = this.statusEnum.conectado;
    this.rankingUri = 'assets/imgs/medal-icon.png';
    this.nickname = 'Ollie';
    this.MsjNotif.msj = 'this is a test msjs';
    this.currentAction = this.actionEnum.invite;
    console.log(this.statusEnum, this.actionEnum);
  }

  
}
