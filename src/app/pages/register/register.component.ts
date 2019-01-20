import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { RegisterModel, LoginModel } from 'src/app/models/global-models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  EmailExisted: boolean;
  MobileExisted: boolean;
  errorMessage: string;

  model: RegisterModel;

  @ViewChild('Password') Password: ElementRef;
  passwordIconStatus: boolean = true;

  constructor(private apiService: ApiService, private localStorage: LocalStorageService, private router: Router) {
    this.model = new RegisterModel();
  }

  ngOnInit() {
  }

  register(): void {
    this.apiService.nonAuthPost("/Account/Register", this.model)
      .subscribe(
        (resp) => {
          let result = resp.json();
          this.EmailExisted = result.Email;
          this.MobileExisted = result.Mobile;
          //this.UserNameExisted = result.UserName;

          if (result.UserId > 0) {
            let loginModel = new LoginModel();
            // loginModel.UserName = this.model.UserName;
            loginModel.Password = this.model.Password;
            loginModel.RememberMe = true;


            this.localStorage.store('isAuthenticated', true);
            this.localStorage.store('userId', result.UserId);
            this.router.navigateByUrl("/", { skipLocationChange: true });

            // let result: any = this.apiService.login(loginModel).subscribe(
            //   (resp) => {
            //     let dat = resp.json();
            //     if (dat.access_token) {
            //       this.localStorage.store('isAuthenticated', true);
            //       this.localStorage.store('userId', result.UserId);
            //       this.localStorage.store('access-token', dat.access_token);
            //       this.router.navigateByUrl("/chat", { skipLocationChange: true });
            //     }
            //     else {
            //       return false;
            //     }
            //   },
            //   (err) => {
            //     let dat = err.json();
            //     this.errorMessage = dat.error_description;
            //   }
            //   );
          }
        },
        (err) => {
          let result = err.json();
          this.errorMessage = result.Message;
        });
  }


  togglePasswordStyle(): void {
    if (this.Password.nativeElement.type === "password") {
      this.Password.nativeElement.type = "text";
    } else {
      this.Password.nativeElement.type = "password";
    }
    this.passwordIconStatus = !this.passwordIconStatus;

    //$('#passwordIcon').toggleClass('glyphicon-eye-open').toggleClass('glyphicon-eye-close');
  }

}
