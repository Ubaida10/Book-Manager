import {inject, Injectable} from '@angular/core';
import {Users} from './users';
import {catchError, map, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url= 'http://localhost:3000/users';
  http = inject(HttpClient);

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any):Observable<T>=>{
      console.error(`${operation} failed:`, error)
      return throwError(()=>new Error(`HTTP Error: ${operation} failed.`));
    }
  }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.url).pipe(
      map(data=>data || []),
      catchError(this.handleError<Users[]>('getAllUsers', []))
    )
  }

  verifyUser(email: string, password: string): Observable<boolean>{
    return this.getAllUsers().pipe(
      map(users=>users.some(user=>user.email === email && user.password === password)),
      catchError(this.handleError<boolean>('verifyUser', false))
    )
  }
}
