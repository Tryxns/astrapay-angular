import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

    constructor(private http:HttpClient){};
  
    private baseUrl:string = "http://localhost:8000";
    private noteAppUrl:string = this.baseUrl+"/v1/notes";

  // Get all notes
  getNotes(): Observable<any> {
    return this.http.get(`${this.noteAppUrl}`).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something went wrong; please try again later.');
  }
  // Get a single note by ID
  getnoteById(sequence_id: number): Observable<any> {
    return this.http.get(`${this.noteAppUrl}/${sequence_id}`);
  }

  // Create a new note
  createNote(note: any): Observable<any> {
    return this.http.post(`${this.noteAppUrl}`, note);
  }
  // Update a note
  // updatenote(id: number, note: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/notes/${id}`, note);
  // }

  // Delete a note
  deleteNote(sequence_id: number): Observable<any> {
    return this.http.delete(`${this.noteAppUrl}/${sequence_id}`);
  }
}
