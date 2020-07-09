import { Component, OnInit, TemplateRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IPictures } from './pictures';
import { PictureService } from './pictures.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {

  errorMessage: string;
  picWidth: number = 200;
  picHeight: number = 200;

  pictures: IPictures[];
  filteredPictures: IPictures[];
  paginator: IPictures[];
  
  modalRef: BsModalRef;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredPictures = this.listFilter ? this.filterList(this.listFilter) : this.pictures;
  }

  constructor(private pictureService: PictureService,
    private modalService: BsModalService) { }
    
  ngOnInit(): void {
    this.pictureService.getPictures().subscribe({
      next: pictures => {
        this.pictures = pictures;
        this.filteredPictures = this.pictures;
      },
      error: err => this.errorMessage = err
    });
  }

  onChangePage(pictures: IPictures[]) {
    this.paginator = pictures;
  }
  openModal(modal: TemplateRef<IPictures>) {
    this.modalRef = this.modalService.show(modal);
  }

  filterList(serachTerm: string): IPictures[] {
    serachTerm = serachTerm.toLocaleLowerCase();

    return this.pictures.filter((picture: IPictures) => picture.title.toLocaleLowerCase().indexOf(serachTerm) !== -1)
  }




}
