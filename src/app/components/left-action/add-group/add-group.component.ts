import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AddGroupModel } from 'src/app/models/group-models';
import { StringModel } from 'src/app/models/global-models';

@Component({
  selector: 'app-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  model: AddGroupModel;
  stringModel: StringModel;
  errorMessage: string;

  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('leftActionDiv') leftActionDiv: ElementRef;
  
  constructor(private apiService: ApiService) {
    this.model = new AddGroupModel();
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
