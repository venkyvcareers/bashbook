import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PopoverModule, BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { CustomDivDirective } from './directives/custom-div.directive';
import { ChatComponent } from './pages/chat/chat.component';
import { TodatePipe, TodatetimePipe, TotimePipe, TohistoryPipe, } from './pipes/utc-to-date/utctodate.pipe';
import { DoubleDirective } from './directives/double.directive';
import { ApiService } from './services/api.service';
import { HttpModule } from '@angular/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatHeaderComponent } from './components/chat/chat-header/chat-header.component';
import { ChatReplyComponent } from './components/chat/chat-reply/chat-reply.component';
import { ChatBodyComponent } from './components/chat/chat-body/chat-body.component';
import { AddEventComponent } from './components/left-action/add-event/add-event.component';
import { AddGroupComponent } from './components/left-action/add-group/add-group.component';
import { ActivityListComponent } from './components/left-action/activity-list/activity-list.component';
import { EditEventComponent } from './components/right-action/edit-event/edit-event.component';
import { EditGroupComponent } from './components/right-action/edit-group/edit-group.component';
import { FriendRequestComponent } from './components/left-action/friend-request/friend-request.component';
import { LookupService } from './services/lookups/lookup.service';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    //canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'event', component: AddEventComponent },
  { path: 'group', component: AddGroupComponent },
  { path: 'profile', component: ProfileComponent },
  //{ path: 'auth', loadChildren: () => System.import('./auth').then((comp: any) => comp.default) },
  //{ path: 'user', loadChildren: () => System.import('./job-seeker').then((comp: any) => comp.default) }
];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    CustomDivDirective,
    TodatePipe, TodatetimePipe, TotimePipe, TohistoryPipe, DoubleDirective,
    LoginComponent, RegisterComponent,
    ProfileComponent, AddEventComponent, AddGroupComponent, ChatHeaderComponent, ChatReplyComponent, ChatBodyComponent, ActivityListComponent, EditEventComponent, EditGroupComponent, FriendRequestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UiSwitchModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ApiService, LookupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
