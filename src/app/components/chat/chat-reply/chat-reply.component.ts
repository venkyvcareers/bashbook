import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AddPost } from 'src/app/models/post-models';
import { ContentTypes } from 'src/app/services/lookups/lookup-enum';

@Component({
  selector: 'app-chat-reply',
  templateUrl: './chat-reply.component.html',
  styleUrls: ['./chat-reply.component.css']
})
export class ChatReplyComponent implements OnInit {

  message: any = null;
  url: any = "assets/images/upload.png";
  userId: number = 2007;

  @Input() currentEntityId: number;
  @Input() currentEntityTypeId: number;
  @Output() pushPost = new EventEmitter<any>();
  @ViewChild('fileUpload') fileUpload: ElementRef;
  
  constructor(private apiService: ApiService) {
   }

  ngOnInit() {
  }

  Send(): void {
    if (this.message != null && this.message != "") {

      let model: AddPost = new AddPost();
      model.EntityId = this.currentEntityId;
      model.EntityTypeId = this.currentEntityTypeId;
      model.ContentTypeId = ContentTypes.Text;
      model.Text = this.message;
      model.PostedBy = this.userId;

      this.apiService.post("Post/Add", model).subscribe((resp) => {
        model.PostId = resp.json();
        model.PostedOn = (new Date).getTime()/1000;
        this.pushPost.emit(model);
        this.message = null;
      },
        (err) => {
          alert("something went wrong.")
        });
    }
  }

  Post(): void {
    if (this.url != null && this.url != "") {

      let model: AddPost = new AddPost();
      model.EntityId = this.currentEntityId;
      model.EntityTypeId = this.currentEntityTypeId;
      model.ContentTypeId = ContentTypes.Image;
      model.Text = this.message;
      model.PostedBy = this.userId;
      model.Url = this.url;
      model.PostedOn = (new Date).getTime()/1000;

      this.apiService.post("Post/Add", model).subscribe((resp) => {
        model.PostId = resp.json();
        this.pushPost.emit(model);
        this.message = null;
        this.url = null;
      },
        (err) => {
          alert("something went wrong.")
        });
    }
  }

  showFileExplorer(): void {
    let el: HTMLElement = this.fileUpload.nativeElement as HTMLElement;
    el.click();
  }

  onFileSelect(event) {
    var file: File = event.target.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.url = myReader.result.toString();
    }
    myReader.readAsDataURL(file);
  }
}