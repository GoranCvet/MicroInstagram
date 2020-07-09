import { Component, OnInit } from '@angular/core';
import { IAlbum } from '../albums';
import { AlbumService } from '../album.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.css']
})
export class EditAlbumComponent implements OnInit {

  album: IAlbum;
  constructor(private albumService: AlbumService,
              private router: Router,
              private route: ActivatedRoute) {} 

  ngOnInit(): void {
    const parametar = this.route.snapshot.paramMap.get('id');
    if(parametar){
      const id = +parametar;
      this.getAlbum(id);
    }else{
      this.album = {
        id: null,
        title: null,
        pictures: [],
        userId: null
      }
    }
  }

  saveAlbum(){
    if(this.album.id == null){
      this.albumService.createAlbum(this.album).subscribe({
        next: album => {
          this.album = album,
          console.log('Success'),
          console.log(album),
          this.router.navigate(['/albums/', this.album.id])
        },
        error: err => console.log(err)
      }
      )}else{
        this.albumService.editAlbum(this.album).subscribe({
          next: album => {
            this.album = album,
            console.log('Successful update'),
            console.log(album)
          }
        })
      }
  }
    
  getAlbum(id: number) {
    this.albumService.getAlbum(id).subscribe({
      next: album => this.album = album,
      error: err => console.log(err)
    });
  }

  clickBack(){
    this.router.navigate(['/albums']);
  }

}
