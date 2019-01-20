import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AddPost, GetPostModel } from 'src/app/models/post-models';
import { ChatBodyComponent } from 'src/app/components/chat/chat-body/chat-body.component';
import { EntityTypes, ContentTypes } from 'src/app/services/lookups/lookup-enum';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  time: number = 1543795207;
  varDouble: number = 5;
  message: any = null;
  chatList: any[];
  leftAction: string;
  userId: 2007;
  currentEntityId: number;
  currentEntityTypeId: number;

  @ViewChild('chatHolderDiv') chatHolderDiv: ElementRef;
  @ViewChild(ChatBodyComponent) chatBodyComponent: ChatBodyComponent;


  constructor(private apiService: ApiService) {
    this.chatList = [];
  }

  ngOnInit() {
    let thisClass = this;
    //setInterval(function () {
      let newGetModel: GetPostModel = new GetPostModel();
      newGetModel.EntityId = +localStorage.getItem('currentEntityId');
      newGetModel.EntityTypeId = +localStorage.getItem('currentEntityTypeId');
      newGetModel.UserId = +localStorage.getItem('userId');
      if (newGetModel.EntityId && newGetModel.EntityTypeId) {
        thisClass.apiService.post("Post/GetAll", newGetModel).subscribe((resp) => {
          thisClass.chatList = resp.json();
        });
      }
    //}, 1000);
  }

  loadPostList(event: GetPostModel): void {
    this.apiService.post("Post/GetAll", event).subscribe((resp) => {
      localStorage.setItem("currentEntityId", event.EntityId.toString());
      localStorage.setItem("currentEntityTypeId", event.EntityTypeId.toString());
      localStorage.setItem("userId", "2007");
      this.currentEntityTypeId = event.EntityTypeId;
      this.currentEntityId = event.EntityId;
      this.chatList = resp.json();
    },
      (err) => {
        alert("something went wrong.");
      });
  }

  TestClick(event) {
    console.log(event);
  }

  Send(): void {
    if (this.message != null && this.message != "") {

      let model: AddPost = new AddPost();
      model.EntityId = 2007;
      model.EntityTypeId = EntityTypes.User;
      model.ContentTypeId = ContentTypes.Text;
      model.Text = this.message;
      model.PostedBy = 2007;

      this.apiService.post("Post/Add", model).subscribe((resp) => {
        this.chatList.push({ UserId: this.userId, Text: this.message, Time: new Date().getTime() / 1000 });
        this.message = null;
      },
        (err) => {
          alert("something went wrong.")
        });
    }
  }

  pushPost(event: AddPost): void {
    this.chatList.push(event);
    this.chatBodyComponent.scrollToBottom();
  }

  reduceChatBodySize(): void {
    this.chatHolderDiv.nativeElement.style.width = "60%";
  }

  resetChatBodySize(): void {
    this.chatHolderDiv.nativeElement.style.width = "100%";
  }
}

export class TestChat {
  UserId: number;
  Text: any;
  Time: Number;
}