import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IAlbum } from './albums';
import { catchError, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class AlbumService {

    // baseUrl: string = 'http://localhost:3000/albums'; //local Json Server
    baseUrl: string = 'https://jsonplaceholder.typicode.com/albums';

    constructor(private http: HttpClient){}

    getAlbums(): Observable<IAlbum[]>{
        return this.http.get<IAlbum[]>(this.baseUrl).pipe(
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

    getAlbum(id: number): Observable<IAlbum | undefined>{
        return this.getAlbums().pipe(
            map((albums: IAlbum[]) => albums.find(a => a.id == id))
        )
    }

    deleteAlbum(id: number): Observable<IAlbum>{
        return this.http.delete<IAlbum>(`${this.baseUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    createAlbum(album: IAlbum): Observable<IAlbum>{
        return this.http.post<IAlbum>(this.baseUrl, album, {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            })
        }).pipe(
            catchError(this.handleError)
        )
    }

    editAlbum(album: IAlbum): Observable<IAlbum>{
        return this.http.put<IAlbum>(`${this.baseUrl}/${album.id}`, album, {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            })
        }).pipe(
            catchError(this.handleError)
        )
    }

}