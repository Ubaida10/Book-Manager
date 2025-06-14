import {inject, Injectable } from '@angular/core';
import {Books} from '../../interfaces/books';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, of, throwError} from 'rxjs'; // Import throwError

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = 'http://localhost:3000/books';
  http = inject(HttpClient);


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error); // Log the error

      return throwError(() => new Error(`HTTP Error: ${operation} failed.`)); // Throw a new error observable
    };
  }

  getAllBooks(): Observable<Books[]>{
    return this.http.get<Books[]>(this.url).pipe(
      map(data => data || []),
      catchError(this.handleError<Books[]>('getAllBooks', []))
    )
  }


  getBook(id: string): Observable<Books | undefined> {
    return this.http.get<Books>(`${this.url}/${id}`).pipe(
      map(data => data),
      catchError(error => {
        if (error.status === 404) {
          console.warn(`Book with ID ${id} not found.`);
          return of(undefined);
        } else {
          return this.handleError<Books | undefined>(`getBook id=${id}`, undefined)(error);
        }
      })
    );
  }

  createBook(title:string, author:string, description:string): Observable<Books>{
    const book = {title, author, description};
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    }

    return this.http.post<Books>(this.url, book, httpOptions).pipe(
      map(data => data),
      catchError(this.handleError<Books>('createBook'))
    )
  }

  updateBook(id:string, books: Books): Observable<Books>{
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    }

    return this.http.put<Books>(`${this.url}/${id}`, books, httpOptions).pipe(
      map(data => data),
      catchError(this.handleError<Books>(`updateBook ${id}`))
    )
  }

  deleteBook(id:string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' })
    };

    return this.http.delete<any>(`${this.url}/${id}`, httpOptions).pipe(
      catchError(this.handleError<any>(`deleteBook ${id}`))
    )
  }
}
