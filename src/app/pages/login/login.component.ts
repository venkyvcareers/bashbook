import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoginModel } from 'src/app/models/global-models';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: LoginModel;
  constructor(private apiService: ApiService,private localStorage: LocalStorageService, private router: Router) {
    this.model = new LoginModel();
  }z

  ngOnInit() {
  }

  login() {
    this.apiService.login(this.model).subscribe((resp) => {
      let dat = resp.json();
      if (dat.access_token) {
        this.localStorage.store('isAuthenticated', true);
        this.localStorage.store('access-token', dat.access_token);
        // Redirect to home page
        this.router.navigateByUrl("/", { skipLocationChange: true });
      }
      else {
        return false;
      }
    },
      (err) => {
        alert("something went wrong.")
      });
  }
}
