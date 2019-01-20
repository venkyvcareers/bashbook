import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserModel } from 'src/app/models/user-models';
import { ApiService } from 'src/app/services/api.service';
import { StringModel } from 'src/app/models/global-models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: UserModel;
  stringModel: StringModel;
  errorMessage: string;

  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('leftActionDiv') leftActionDiv: ElementRef;
  
  constructor(private apiService: ApiService) { 
    this.model = new UserModel();
    this.stringModel = new StringModel();
    this.model.UserId = 2007;
  }

  ngOnInit() {
  }

  save(form): void {

    console.log(form);

    this.apiService.post("/User/UpdateUserInfo", this.model)
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

    this.apiService.post("/User/UpdateMessage", this.stringModel)
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

    this.apiService.post("/User/UpdateImage", this.stringModel)
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
