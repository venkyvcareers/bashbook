import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My First Angular App!';

  model:any;

  constructor(){
    this.model = {};
    this.model.Count = 0;
    this.model.List = [];
    this.model.isTrue = true;
  }

  getList()
  {
    this.model.List = [];
    for (let index = 0; index < this.model.Count; index++) {
      this.model.List.push("");

    }
  }
  trackByFn(index, item) {
    return index; // or item.id
  }
}
