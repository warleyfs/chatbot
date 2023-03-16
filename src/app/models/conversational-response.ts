import { Timestamp } from "rxjs";
import { Button } from "./button";

export class ConversationalResponse { 
    
    constructor(public type: number = 0, 
        public speech: string = '', 
        public title: string = '', 
        public subtitle: string = '', 
        public imageUrl: string = '', 
        public buttons: Button[] = new Array<Button>(), 
        public payload: any = { 
            destinationName: '', 
            url: ''
        }, 
        public timestamp?: Date)
    {
    }
}