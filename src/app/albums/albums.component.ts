import { Component, OnInit, TemplateRef } from '@angular/core';
import { IAlbum } from './albums';
import { AlbumService } from './album.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  errorMessage: string;
  albums: IAlbum[];
  album: IAlbum;
  modalRef: BsModalRef;
  filteredAlbums: IAlbum[];

  _albumList: string;
  public get albumList() : string {
    return this._albumList;
  }
   
  
  public set albumList(value : string) {
    this._albumList = value;
    this.filteredAlbums = this.albumList ? this.filterList(this.albumList) : this.albums;
  }
  

  constructor(private albumService: AlbumService,
              private modalService: BsModalService, 
              private router: Router) { }

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe(
      {
        next: albums => {
          this.albums = albums,
          this.filteredAlbums = albums
        },
        error: err => this.errorMessage = err
      });
  }

  deleteAlbum(id: number){
    this.albumService.deleteAlbum(id).subscribe({
      next: album => {
        this.album = album,
        console.log('Album Successfully deleted ! '),
        this.modalRef.hide()
      },
      error: error => console.log(error)
    });
    
  }
  
  openModal(modal: TemplateRef<IAlbum>){
    this.modalRef = this.modalService.show(modal);
  }

  filterList(serachTerm: string): IAlbum[] {
    serachTerm = serachTerm.toLocaleLowerCase();
    return this.albums.filter((picture: IAlbum) => picture.title.toLocaleLowerCase().indexOf(serachTerm) !== -1)
  }

}
