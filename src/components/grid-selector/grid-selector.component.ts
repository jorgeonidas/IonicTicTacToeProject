import { Component } from "@angular/core";
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

    `]
})

export class GridSelectorComponent{
    
    options: any;
    canDrag: boolean; //puedo arrastrar?
    asset: string;

    constructor(private dragService : DragulaService){

        //configuracion
        dragService.setOptions('bag', { 
            copy: true,
            removeOnSpill: true,
            revertOnSpill: true,
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

        

    }
    
    onDrag(value){
        //console.log("arrastrando: "+value[2]);
    }

    onOver(value){
        //console.log(value);
        /*
        if(value[2].id === "choicecell"){
            console.log("Borrar over");
            value[1].remove();
        }*/
    }
 

    onDrop(value){
        console.log(value);
        let [e, el, targert, source] = value;
        //console.log(e);
        //console.log(el);
        console.log(targert);
        console.log(value[1].currentSrc); //valor del elemento arrastrado
        let currSrc = value[1].currentSrc;
        let index = this.getPosition(currSrc,'/',3);
        this.asset = currSrc.substring(index+1,currSrc.length);
        console.log(this.asset);
        
        //console.log(source);
        
        if(value[4]!= null){
            value[4].remove();
        }
        //console.log("Borrar drop");            
        

    }

     getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
     }

}