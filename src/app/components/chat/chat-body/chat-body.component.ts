import { Component, OnInit, Input, ViewChild, ElementRef, Output } from '@angular/core';
import { ContentTypes } from 'src/app/services/lookups/lookup-enum';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.css']
})
export class ChatBodyComponent implements OnInit {

  @ViewChild("content") content: ElementRef;

  private _conversationList: any[];

  get conversationList(): any[] {
    // transform value for display
    return this._conversationList;
  }

  @Input()
  set conversationList(conversationList: any[]) {
    this._conversationList = conversationList;
    setTimeout(() => {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    }, 10);
  }

  userId: number = 2007;
  ContentType_Text: number = ContentTypes.Text;
  constructor() { }

  ngOnInit() {
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    }, 10);
  }
}
