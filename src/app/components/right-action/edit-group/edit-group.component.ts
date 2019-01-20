import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { EditGroupModel } from 'src/app/models/group-models';
import { StringModel } from 'src/app/models/global-models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  model: EditGroupModel;
  stringModel: StringModel;
  errorMessage: string;

  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('rightActionDiv') rightActionDiv: ElementRef;
  @Output() resetSize = new EventEmitter<any>();
  
  constructor(private apiService: ApiService) {
    this.model = new EditGroupModel();
    this.stringModel = new StringModel();

    this.stringModel.Id = this.apiService.userId;
   }

  ngOnInit() {
  }

  add(): void {
    this.apiService.post("/Group/Add", this.model)
      .subscribe(
        (resp) => {
          let result = resp.json();

        },
        (err) => {
          let result = err.json();
          this.errorMessage = result.Message;
        });
  }

  edit(): void {
    this.apiService.post("/Group/Edit", this.model)
      .subscribe(
        (resp) => {
          let result = resp.json();

        },
        (err) => {
          let result = err.json();
          this.errorMessage = result.Message;
        });
  }

  saveImage(): void {
    this.stringModel.Text = this.model.Image;
    this.apiService.post("/Group/UpdateImage", this.stringModel)
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
    this.apiService.post("/Group/UpdateMessage", this.stringModel)
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
    this.apiService.post("/Group/UpdateTitle", this.stringModel)
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
