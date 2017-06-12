import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BucketService } from './bucket.service';
import { BucketListHeaderComponent } from './bucket-list-header/bucket-list-header.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { BucketListItemComponent } from './bucket-list-item/bucket-list-item.component';
import { BucketListFooterComponent } from './bucket-list-footer/bucket-list-footer.component';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    BucketListHeaderComponent,
    BucketListComponent,
    BucketListItemComponent,
    BucketListFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [BucketService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
