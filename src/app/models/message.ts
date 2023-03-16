import { Content } from './content';

export class Message {
  constructor(public avatar: string = '', public timestamp?: Date, public content?: Array<Content>) {
    this.content = content;
    this.timestamp = timestamp;
    this.avatar = avatar;
  }
}
