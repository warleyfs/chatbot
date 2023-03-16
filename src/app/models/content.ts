import { Button } from "./button";

export class Content {
    constructor(
        public type: string = 'simple_text',
        public text: string = '',
        public title: string | undefined,
        public subtitle: string | undefined,
        public imageUrl: string | undefined,
        public buttons: Array<Button> | undefined
    ) {
    }
}
