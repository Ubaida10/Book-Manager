import {Component, inject, Input} from '@angular/core';
import {Books} from '../books';
import {ActivatedRoute} from '@angular/router';
import {BoookService} from '../boook-service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-book-details',
  imports: [
    NgIf
  ],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails {
  route: ActivatedRoute = inject(ActivatedRoute);
  booksService = inject(BoookService);

  book: Books | undefined;

  constructor() {
    const id = Number(this.route.snapshot.params['id']);

    this.booksService.getBook(id).then((currBook)=>{
      this.book = currBook;
    });
  }


  editBook(){
    console.log('Editing book:', this.book);
  }

  deleteBook(){
    console.log('Delete book:', this.book);
  }
}
