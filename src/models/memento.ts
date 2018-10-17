/**
 * El memento es un objeto plano
 * que modela el estado actual de la aplicacion
 * sera implementado por el Originator para mutar 
 * el estado actual de la app y el CareTaker
 * para guardar y restaurar el estado de la app
 */

export class Memento{
    
    private state = {
        daysInRow : 0,
        easy: {
            played : 0,
            win: 0,
            lose: 0,
        },
        medium: {
            played : 0,
            win: 0,
            lose: 0,
        },
        hard: {
            played : 0,
            win: 0,
            lose: 0,
        },
        localMultiplayerPlayed: 0,
        cristals : 0,
        eolas: 0,
        doublingReward : 0,
        unlocks: 0,
    };
    
    //OJO EN UN FUTURO EL MEMENTO SE REESTABLECERA DE UN CARETAKER
    constructor(state :any){
        this.state = state;
    }

    getState(){
        return this.state;
    }

    setState(state:any){
        this.state = state;
    }
}