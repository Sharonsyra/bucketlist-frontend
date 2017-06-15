import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router'

import { AppComponent } from './app.component';
import { BucketService } from './bucket-list/bucket.service';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { BucketListItemComponent } from './bucket-list-item/bucket-list-item.component';
import { UserService } from './user/user.service';
import { ItemService } from './bucket-list-item/item.service';
import { ApiService } from './api.service';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BucketListComponent,
    BucketListItemComponent,
    UserComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'bucketlists', component: BucketListComponent },
      { path: 'users', component: UserComponent},
      { path: '', component: HomeComponent },
      {path: 'Bucketlist', component: BucketListItemComponent}
      ])
  ],
  providers: [BucketService, ApiService, UserService, ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
