import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { EditEventModel } from 'src/app/models/event-models';
import { StringModel } from 'src/app/models/global-models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  model: EditEventModel;
  stringModel: StringModel;
  errorMessage: string;

  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('rightActionDiv') rightActionDiv: ElementRef;

  @Output() resetSize = new EventEmitter<any>();
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  saveImage(): void {
    this.stringModel.Text = this.model.Image;
    this.apiService.post("/Event/UpdateImage", this.stringModel)
      .subscribe(
        (resp) => {
          let result = resp.json();
        },
        (err) => {
          let result = err.json();
          this.errorMessage = result.Message;
        });
  }

  saveMessage(): void {
    this.stringModel.Text = this.model.Message;
    this.apiService.post("/Event/UpdateMessage", this.stringModel)
      .subscribe(
        (resp) => {
          let result = resp.json();

        },
        (err) => {
          let result = err.json();
          this.errorMessage = result.Message;
        });
  }

  saveTitle(): void {
    this.stringModel.Text = this.model.Title;
    this.apiService.post("/Event/UpdateTitle", this.stringModel)
      .subscribe(
        (resp) => {
          let result = resp.json();

        },
        (err) => {
          let result = err.json();
          this.errorMessage = result.Message;
        });
  }

  showFileExplorer(): void {
    let el: HTMLElement = this.fileUpload.nativeElement as HTMLElement;
    el.click();
  }

  onFileSelect(event) {
    var file: File = event.target.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.model.Image = myReader.result.toString();
    }
    myReader.readAsDataURL(file);
  }

  show(): void {
    this.rightActionDiv.nativeElement.style.right = "0";
  }

  hide(): void {
    this.rightActionDiv.nativeElement.style.right = "-100%";
    this.resetSize.emit(100);
  }
}
