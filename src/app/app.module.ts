import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwPaginationModule } from 'jw-angular-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';


import { AppComponent } from './app.component';
import { PicturesComponent } from './pictures/pictures.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PictureDetailsComponent } from './pictures/picture-details/picture-details.component';
import { HomeComponent } from './home/home.component';
import { UploadPictureComponent } from './pictures/upload-picture/upload-picture.component';
import { EditPictureComponent } from './pictures/edit-picture/edit-picture.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './albums/album-details/album-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditAlbumComponent } from './albums/edit-album/edit-album.component';
import { NavbarComponent } from './nav/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    PicturesComponent,
    PictureDetailsComponent,
    HomeComponent,
    UploadPictureComponent,
    EditPictureComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    EditAlbumComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'albums', component: AlbumsComponent},
      {path: 'albums/:id', component: AlbumDetailsComponent},
      {path: 'album/edit', component: EditAlbumComponent},
      {path: 'album/edit/:id', component: EditAlbumComponent},
      {path: 'pictures', component: PicturesComponent},
      {path: 'pictures/details/:id', component: PictureDetailsComponent},
      {path: 'pictures/upload', component: EditPictureComponent},
      {path: 'pictures/edit/:id', component: EditPictureComponent},
      {path: '',redirectTo: 'pictures', pathMatch: 'full'},
      {path: '**', redirectTo: 'pictures', pathMatch: 'full'}
    ]),
    NoopAnimationsModule,
    JwPaginationModule,
    PaginationModule.forRoot(),
    NgbModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
