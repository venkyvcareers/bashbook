import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { EditEventComponent } from '../../right-action/edit-event/edit-event.component';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.css']
})
export class ChatHeaderComponent implements OnInit {

  @ViewChild(EditEventComponent) eventComp:EditEventComponent;

  @Output() reduceSize = new EventEmitter<any>();
  @Output() resetSize = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  ShowEditGroup(): void {
    // this.groupComp.show();
  }

  ShowEditEvent(): void {
    this.eventComp.show();
    this.reduceSize.emit(60);
  }

  resetSizeChatHolder(): void {
    this.resetSize.emit(100);
  }
  
}
