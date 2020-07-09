import { Component, OnInit, COMPILER_OPTIONS } from '@angular/core';
import { AlbumService } from '../album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlbum } from '../albums';
import { PictureService } from 'src/app/pictures/pictures.service';
import { IPictures } from 'src/app/pictures/pictures';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {
  errorMessage: string;
  picWidth: number = 200;
  picHeight: number = 200;
  album: IAlbum = {
    id: null,
    title: null,
    pictures: [],
    userId: null
  }

  niza: any[];
  
  paginator: IPictures[];

  constructor(private albumService: AlbumService,
              private pictureService: PictureService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.album.pictures = [];

    const parametar = this.route.snapshot.paramMap.get('id');
    if(parametar){
      const id = +parametar;
      this.getAlbum(id);
      this.pictureService.getPictures().subscribe({
        next: pictures => this.album.pictures = pictures.filter(p => p.albumId == id),
        error: err => this.errorMessage = err
      })
    };
    
  }

  getAlbum(id: number){
    this.albumService.getAlbum(id).subscribe({
    next: album => {
      this.album = album,
      this.album.pictures = []
    },
      error: err => this.errorMessage = err
    });
  }

  onChangePage(pictures: IPictures[]) {
    this.paginator = pictures;
  }

}