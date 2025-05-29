import {Component, inject} from '@angular/core';
import {BoookService} from '../boook-service';
import {Books} from '../books';
import {BookItem} from '../book-item/book-item';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-book-list',
  imports: [
    BookItem,
    RouterLink
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  booksList: Books[] = [];

  booksService = inject(BoookService);
  constructor() {
    this.booksService.getAllBooks().then((books: Books[])=>{
      this.booksList = books;
    });
  }
}
