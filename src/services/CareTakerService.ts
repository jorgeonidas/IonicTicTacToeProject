import { Memento } from "../models/memento";

export class CareTakerService{

    private memento : Memento;

    setState(memento: Memento){
       this.memento = memento; 
    }

    getState() : Memento{
        return this.memento;
    }
}