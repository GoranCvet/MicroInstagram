import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPictures } from '../pictures';
import { PictureService } from '../pictures.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-picture-details',
  templateUrl: './picture-details.component.html',
  styleUrls: ['./picture-details.component.css']
})
export class PictureDetailsComponent implements OnInit {

  picture: IPictures;
  modalRef: BsModalRef;
  picWidth: number = 600;
  picHeight: number = 600;

  constructor(private pictureService: PictureService, 
              private router: Router,
              private route: ActivatedRoute,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    const parametar = this.route.snapshot.paramMap.get('id');
    if(parametar){
      const id = +parametar;
      this.getPicture(id);
    }
  }

  getPicture(id: number){
      this.pictureService.getPicture(id).subscribe({
      next: picture => this.picture = picture,
      error: err => console.log(err)
    });
  }

  backToPictures(){
    this.router.navigate(['/pictures']);
  }
  backToAlbum(){
    this.router.navigate(['albums', this.picture.albumId])
  }

  deletePicture(){
    this.pictureService.deletePicture(this.picture.id).subscribe({
      next: picture => console.log(`Picture with id ${this.picture.id} is deleted`),
      error: error => console.log(error)
    });
    this.modalRef.hide();
    this.router.navigate(['/pictures']);
  }

  openModal(modal: TemplateRef<IPictures>){
    this.modalRef = this.modalService.show(modal);
  }

}
