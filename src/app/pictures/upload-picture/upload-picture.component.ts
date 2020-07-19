import { Component, OnInit } from '@angular/core';
import { IPictures } from '../pictures';
import { PictureService } from '../pictures.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ControlContainer } from '@angular/forms';
import { IAlbum } from 'src/app/albums/albums';
import { AlbumService } from 'src/app/albums/album.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent implements OnInit {

  imagePath: string;
  imageUrl: string;
  picture: IPictures = {
    id: null,
    albumId: null,
    title: null,
    thumbnailUrl: null,
    url: null
  };
  albums: IAlbum[];
  errorMessage: string;

  selectedFile: File;

  constructor(private pictureService: PictureService,
    private albumService: AlbumService,
    private router: Router,
    private route:ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe({
      next: albums => this.albums = albums,
      error: err => this.errorMessage = err
    })
  }

  onFileSelect(files){
    this.selectedFile = files[0].name;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      // this.picture.url = reader.result;
      // this.picture.thumbnailUrl = reader.result; 
    }
  }

  getPicture(id: number){
    this.pictureService.getPicture(id).subscribe({
    next: picture => this.picture = picture,
  });
  }

  uploadPicture() {
    this.pictureService.uploadPicture(this.picture).subscribe({
        next: picture => console.log(picture),
        error: err => console.log(err)
      });
    this.router.navigate(['/pictures']);
  }

}
