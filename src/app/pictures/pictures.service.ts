import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { IPictures } from './pictures';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class PictureService{

    baseUrl: string = 'http://localhost:3000/pictures'
    constructor(private http: HttpClient){

    }

    getPictures(): Observable<IPictures[]> {
        return this.http.get<IPictures[]>(this.baseUrl).pipe(
            catchError(this.handleError)
        )
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage = `An error occured:  ${err.error.message}`; //Client side Error 
        }
        else{
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`; // Server side error
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

    getPicture(id: number): Observable<IPictures>{
        return this.getPictures().pipe(
            map((pictures: IPictures[]) => pictures.find(p => p.id ===id))
        )
        // return this.http.get<IPictures>(`${this.baseUrl}/${id}`).pipe(
        //     catchError(this.handleError)
        // );
    }

    deletePicture(id: number): Observable<void>{
       return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
           catchError(this.handleError)
       );
    }
    
    uploadPicture(picture: IPictures): Observable<IPictures>{
        return this.http.post<IPictures>(this.baseUrl, picture, {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            })
        }).pipe(
            catchError(this.handleError)
        );
    }
    
    editPicture(picture: IPictures): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${picture.id}`, picture, {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            })
        })
    }


}