import { Component, OnInit } from '@angular/core';
import { PictureService } from '../pictures.service';
import { IPictures } from '../pictures';
import { Router, ActivatedRoute } from '@angular/router';
import { IAlbum } from 'src/app/albums/albums';
import { AlbumService } from 'src/app/albums/album.service';

@Component({
  selector: 'app-edit-picture',
  templateUrl: './edit-picture.component.html',
  styleUrls: ['./edit-picture.component.css']
})
export class EditPictureComponent implements OnInit {

  picWidth: number = 600;
  picHeight: number = 600;
  picture: IPictures = {
    id: null,
    albumId: null,
    title: null,
    thumbnailUrl: null,
    url: null
  };
  album: IAlbum = {
    id: null,
    pictures: [],
    title: null,
    userId: null
  }
  albums: IAlbum[];

  constructor(private pictureService: PictureService,
              private albumService: AlbumService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const parametar = this.route.snapshot.paramMap.get('id');
    if(parametar){
      const id = +parametar;
      this.getPicture(id);
    };
    this.albumService.getAlbums().subscribe({
      next: albums => this.albums = albums,
      error: err => console.log(err)
    });
  }

  getPicture(id: number){
    this.pictureService.getPicture(id).subscribe({
      next: picture => this.picture = picture,
      error: err => console.log(err),
    });
  }
  getAlbum(id: number){
    this.albumService.getAlbum(this.picture.albumId).subscribe({
      next: album => this.album = album,
      error: err => console.log(err)
    });
  }

  clickBack(){
    this.router.navigate(['/pictures']);
  }
  
  editPicture(){
    this.pictureService.editPicture(this.picture).subscribe({
      next: picture => {
        console.log('Success'),
        console.log(picture),
        this.router.navigate(['/pictures/details/', this.picture.id])
      },
      error: err => console.log(err)
    });
  }


  
}
