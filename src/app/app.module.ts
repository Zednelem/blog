import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PostListComponent} from './post-list/post-list.component';
import {PostListItemComponent} from './post-list/post-list-item/post-list-item.component';
import {PostService} from './services/post.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './header/header.component';
import {NewPostComponent} from './post-list/new-post/new-post.component';
import {NgbButtonsModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {EmbedService} from './services/embed.service';
import {ServerService} from './services/server.service';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostListItemComponent,
    HeaderComponent,
    NewPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbButtonsModule
  ],
  providers: [PostService, HttpClient, EmbedService, ServerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
