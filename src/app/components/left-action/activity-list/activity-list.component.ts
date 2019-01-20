import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AddEventComponent } from '../add-event/add-event.component';
import { AddGroupComponent } from '../add-group/add-group.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { ApiService } from 'src/app/services/api.service';
import { ActivityModel } from 'src/app/models/entity-models';
import { GetPostModel } from 'src/app/models/post-models';
import { FriendRequestComponent } from '../friend-request/friend-request.component';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  @ViewChild(AddEventComponent) eventComp: AddEventComponent;
  @ViewChild(AddGroupComponent) groupComp: AddGroupComponent;
  @ViewChild(ProfileComponent) profileComp: ProfileComponent;
  @ViewChild(FriendRequestComponent) friendRequestComp: FriendRequestComponent;

  @Output() loadEntityPostList = new EventEmitter<any>();

  userId: number;
  activityList: ActivityModel;
  constructor(private apiService: ApiService) {
    this.userId = 2007;
    this.activityList = new ActivityModel();
  }

  ngOnInit() {
    this.apiService.get("User/GetActivityList/" + this.userId).subscribe((resp) => {
      this.activityList = resp.json();
    },
      (err) => {
        alert("something went wrong.")
      });
  }

  loadEntity(entityId: number, entityTypeId: number): void {
    let loadModel: GetPostModel = new GetPostModel();
    loadModel.EntityId = entityId;
    loadModel.EntityTypeId = entityTypeId;
    loadModel.UserId = this.userId;
    this.loadEntityPostList.emit(loadModel);
  }

  ShowNewGroup(): void {
    this.groupComp.show();
  }

  ShowNewEvent(): void {
    this.eventComp.show();
  }

  ShowEditProfile(): void {
    this.profileComp.show();
  }

  showFriendRequest(): void {
    this.friendRequestComp.show();
  }
}
