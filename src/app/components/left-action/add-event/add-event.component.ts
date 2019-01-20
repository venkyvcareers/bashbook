import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AddEventModel } from 'src/app/models/event-models';
import { StringModel } from 'src/app/models/global-models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  model: AddEventModel;
  stringModel: StringModel;
  errorMessage: string;

  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('leftActionDiv') leftActionDiv: ElementRef;

  constructor(private apiService: ApiService) {
    this.model = new AddEventModel();
    this.stringModel = new StringModel();

    this.stringModel.Id = this.apiService.userId;
  }

  ngOnInit() {
  }

  add(): void {
    this.apiService.post("/Event/Add", this.model)
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
    this.leftActionDiv.nativeElement.style.left = "0";
  }

  hide(): void {
    this.leftActionDiv.nativeElement.style.left = "-100%";
  }
}
