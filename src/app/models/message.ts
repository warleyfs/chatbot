import { Content } from './content';

export class Message {
  constructor(public avatar: string = '', public timestamp?: Date, public content?: Array<Content>, public fromBot: boolean = true) {
  }
}
