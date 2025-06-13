import {Component, inject, OnInit} from '@angular/core';
import {BoookService} from '../boook-service';
import {Books} from '../books';
import {BookItem} from '../book-item/book-item';
import {RouterLink} from '@angular/router';
import {catchError, Observable, of, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [
    BookItem,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {
  booksList$!: Observable<Books[] | undefined>

  booksService = inject(BoookService);
  constructor() {}

  ngOnInit(){
    this.booksList$ = this.booksService.getAllBooks().pipe(
      tap(()=>console.log("Fetching all books")),
      catchError(err=>{
        return of (undefined)
      })
    );
  }
}
