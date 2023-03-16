import { Component, OnInit, Input, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from './../../models';
import { MessageItemComponent } from './../../components/message-item/message-item.component';
import { Content } from '../../models/content';
// import { SimpleText } from '../../models/simple-text';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit, AfterViewInit {

    @Input('messages')
    public messages: Message[] | undefined;

    @Output() sendSimpleMessage = new EventEmitter<string>();

    @ViewChild('chatlist', { read: ElementRef })
    chatList!: ElementRef;

    @ViewChildren(MessageItemComponent, { read: ElementRef })
    chatItems!: QueryList<MessageItemComponent>;

    constructor() { }

    ngAfterViewInit() {
        this.chatItems?.changes.subscribe(elements => {
            this.scrollToBottom();
        });
    }

    public sendSimpleText(simpleText: string): void {
        this.sendSimpleMessage.emit(simpleText);
    }

    private scrollToBottom(): void {
        try {
            this.chatList.nativeElement.scrollTop = this.chatList?.nativeElement.scrollHeight;
        } catch (err) {
            console.log('Could not find the "chatList" element.');
        }
    }

    ngOnInit() {
    }

}
