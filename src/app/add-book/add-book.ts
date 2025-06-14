import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BookService} from '../services/BooksService/book.service';
import {Router} from '@angular/router';
import {catchError, EMPTY, tap} from 'rxjs';

@Component({
  selector: 'app-add-book',
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})
export class AddBook {
  booksService = inject(BookService);
  router: Router = inject(Router);

  isLoading = false;

  submissionError:string | null = null;
  //Reactive Form
  newBookForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
  });
  createNewBook(){
    this.isLoading = true; // Start loading
    this.submissionError = null;

    if(this.newBookForm.invalid){
      console.error('Form is invalid. Cannot create book.');
      this.submissionError = 'Please fill in all required fields.';
      this.isLoading = false;

      this.newBookForm.markAllAsTouched();
      return;
    }

    this.booksService.createBook(
      this.newBookForm.value.title ?? '',
      this.newBookForm.value.author ?? '',
      this.newBookForm.value.description ?? ''
    ).pipe(
      tap(r=>{
        console.log('Book created successfully:', r);
        this.isLoading = false;
        this.router.navigate(['/books']);
      }),

      catchError(err => {
        console.error('Error creating book:', err);
        this.isLoading = false;
        this.submissionError = 'Failed to create book. Please try again.';
        return EMPTY;
      })
    ).subscribe();
  }
}
