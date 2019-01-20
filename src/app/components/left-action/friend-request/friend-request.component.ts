import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {

  @ViewChild('leftActionDiv') leftActionDiv: ElementRef;

  public currentItem: number;
  public currentSuggest: number;
  public list: any = [1,2,3];
  public suggest: any = [1,2,3];

  constructor() { 
  }

  ngOnInit() {
  }

  show(): void {
    this.leftActionDiv.nativeElement.style.left = "0";
  }

  hide(): void {
    this.leftActionDiv.nativeElement.style.left = "-100%";
  }

  showFriendOptions(item): void {
    this.currentItem = item;
  }

  hideFriendOptions(): void {
    this.currentItem = -1;
  }

  showSuggestOptions(item): void {
    this.currentSuggest = item;
  }

  hideSuggestOptions(): void {
    this.currentSuggest = -1;
  }  

}
