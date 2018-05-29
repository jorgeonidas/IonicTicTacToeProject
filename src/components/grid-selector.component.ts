import { Component } from "@angular/core";

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

}