import { Component, Output, EventEmitter } from "@angular/core";
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
    selector: 'grid-selector-component',
    templateUrl: 'grid-selector.html',
    styles: [`
        .borderGrid {
            border: 4px solid #0de5da;
            border-radius: 12px;
        }

        #oo{
            border-bottom: 2px solid gray;
        }

        #oi{
            border-left: 2px solid gray;
            border-right: 2px solid gray;
            border-bottom: 2px solid gray;
        }

        #oii{
            border-right: 2px solid gray;
            border-bottom: 2px solid gray;
        }

        #oiii{
            border-bottom: 2px solid gray;
        }

        #io{
            border-right: 2px solid gray;
        }

        #ioi{
            border-left: 2px solid gray;
            border-right: 2px solid gray;
        }

        img{
            max-height: 8rem;
        }

    `]
})

export class GridSelectorComponent{

    options: any;
    canDrag: boolean; //puedo arrastrar?

    asset: string;

    @Output() pOneEmmiter = new EventEmitter<string>();
    @Output() pTwoOrBotEmmiter = new EventEmitter<string>();

    @Output() isOverOneEmmiter = new EventEmitter<boolean>();
    @Output() isOverTwoEmmiter = new EventEmitter<boolean>();

    constructor(private dragService : DragulaService){
        const bag: any = this.dragService.find('bag');
        if (bag !== undefined ) this.dragService.destroy('bag');
        //configuracion
        dragService.setOptions('bag', { 
            copy: true,
            removeOnSpill: true,
            revertOnSpill: true,
            mmirrorContainer: null,
            //que container son validos para hacer drag
            moves: function (el:any, container:any, handle:any):any {
                this.canDrag = true;
                if(container.id === "portraitselectorp1" || container.id === "portraitselectorp2ob" ){ //si es el retrato seleccionado no puedo arrastrarlo
                    this.canDrag = false;
                }
                return this.canDrag;
            },

            //un container targert acepta contenido de otro container source
            accepts: function(el:any, target:any, source:any, sibling:any): any{
                                             
                if(target.id !== source.id)
                    return true;
            }
          });

        //eventos
        dragService.drag.subscribe((value) => {
            //console.log(value[2].id);
            //this.onDrag(value);
          });
        
        dragService.drop.subscribe((value)=>{
            this.onDrop(value);
        })

        dragService.over.subscribe((value)=>{
            this.onOver(value);
        });

        dragService.out.subscribe((value)=>{
            this.onOut(value);
        });

        

    }
    
    onDrag(value){
        //console.log("arrastrando: "+value[2]);
    }

    onOver(value){
        switch(value[2].id){
            case "portraitselectorp1":
                this.isOverOneEmmiter.emit(true);
            break;
            case "portraitselectorp2ob":
                this.isOverTwoEmmiter.emit(true);
            break;
        }
    }
    
    onOut(value){
        switch(value[2].id){
            case "portraitselectorp1":
                this.isOverOneEmmiter.emit(false);
            break;
            case "portraitselectorp2ob":
                this.isOverTwoEmmiter.emit(false);
            break;
        }
    }

    onDrop(value){
        console.log(value);
        let [e, el, targert] = value;
        //console.log(e);
        //console.log(el);
        console.log(targert);
        console.log(value[1].currentSrc); //valor del elemento arrastrado
        let currSrc : string = value[1].currentSrc;
        let index = currSrc.lastIndexOf("/");
        this.asset = "assets/imgs/" + currSrc.substring(index+1,currSrc.length); //substring que dara la direccion del asset
        console.log("extracterd "+this.asset);
        if(value[2].id === "portraitselectorp1"){         
            this.pOneEmmiter.emit(this.asset);//la info del asset actualizara la vista 
            value[1].remove(); //remuevo para evitar duplicados
        }else if(value[2].id === "portraitselectorp2ob"){
            this.pTwoOrBotEmmiter.emit(this.asset);
            value[1].remove(); 
        }

    }
    //
     getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
     }

     

}