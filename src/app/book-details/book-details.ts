import {Component, inject, Input} from '@angular/core';
import {Books} from '../books';
import {ActivatedRoute, Router} from '@angular/router';
import {BoookService} from '../boook-service';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-book-details',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails {
  route: ActivatedRoute = inject(ActivatedRoute);
  booksService = inject(BoookService);
  router: Router = inject(Router);
  book: Books | undefined;
  isEditing = false;
  constructor() {
    const id:string = this.route.snapshot.params['id'];

    this.booksService.getBook(id).then((currBook)=>{
      this.book = currBook;
    });
  }


  editBook(){
    this.isEditing = true;
  }

  deleteBook(){
    if(!this.book) return;

    const confirmed = confirm(`Are you sure you want to delete "${this.book.title}"?`);
    if(confirmed){
      this.booksService.deleteBook(this.book.id).then(()=>{
        console.log('Deleting book');
        this.router.navigate(['/books']);
      });
    }
  }

  saveBook() {
    if(!this.book) return;

    this.booksService.updateBook(this.book.id, this.book).then((updatedBook:Books)=>{
      this.book = updatedBook;
      this.isEditing = false;
      this.router.navigate(['/books']);
    })
  }
}
