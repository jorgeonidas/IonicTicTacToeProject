import { Component, Output, EventEmitter, Input } from "@angular/core";
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { PlayerSelectorService } from "../../services/playerSelService";

@Component({
    selector: 'grid-selector-component',
    templateUrl: 'grid-selector.html',
    styles: [`
        /**##################Borde de componente#################################*/
        .borderGrid {
            border: 4px solid #0de5da;
            border-radius: 12px;
        }
        /*##############Cell Borders################*/
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
        /*#########selector indicators############*/
        .ollie-character-wrapper {
            position: relative;
        }

        .player-indicator-wrapper {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .player-indicator.p1 {
            color: #488aff;
            background: #c7d1e0;
        }

        .player-indicator.p2 {
            color: #f26fe5;
            background: #c7d1e0;
            right: 0;
        }
        /*#################images##############################*/
        img{
            max-height: 8rem;
        }

        ion-thumbnail img{
            width: 100%;
            height: 100%;
        }

    `]
})

export class GridSelectorComponent{
    p2OrBotText: string;

    options: any;
    canDrag: boolean; //puedo arrastrar?

    asset: string;

    @Output() pOneEmmiter = new EventEmitter<string>();
    @Output() pTwoOrBotEmmiter = new EventEmitter<string>();

    @Output() isOverOneEmmiter = new EventEmitter<boolean>();
    @Output() isOverTwoEmmiter = new EventEmitter<boolean>();

    characterUris: string[];

    constructor(private dragService : DragulaService, private playerSelService: PlayerSelectorService){
        const bag: any = this.dragService.find('bag');
        this.characterUris = ['assets/imgs/enojado.png',
                                'assets/imgs/cansado.png',
                                'assets/imgs/enamorado.png',
                                'assets/imgs/escondido.png',
                                'assets/imgs/like.png',
                                'assets/imgs/upps.png',
                                'assets/imgs/sorprendido.png',
                                'assets/imgs/lol.png',
                            ];


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
        //para poner el caracter correcto al jugador 2 'R' o 'P2'
        this.setSingleOrMulti(this.playerSelService.getIsSinglePlayer());
        this.playerSelService.resetPicks();
    }

    setSingleOrMulti(single: boolean){
        if(single){
            this.p2OrBotText = 'R';
        }else{
            this.p2OrBotText = 'P2'
        }
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
        let portraitIndex = this.playerSelService.getPortraitIndex(this.asset);
        console.log("extracterd "+this.asset);
        if(value[2].id === "portraitselectorp1"){         
            this.pOneEmmiter.emit(this.asset);//la info del asset actualizara la vista 
            value[1].remove(); //remuevo para evitar duplicados
            this.playerSelService.setPickPone(portraitIndex);
            
        }else if(value[2].id === "portraitselectorp2ob"){
            this.pTwoOrBotEmmiter.emit(this.asset);
            value[1].remove(); 
            this.playerSelService.setPickTwoOrBot(portraitIndex);
        }

    }
    //
     getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
     }

     

}