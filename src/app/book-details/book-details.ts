import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Books} from '../books';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {BoookService} from '../boook-service';
import {AsyncPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {catchError, EMPTY, Observable, of, Subscription, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-book-details',
  imports: [
    FormsModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails implements OnInit, OnDestroy{
  route:ActivatedRoute = inject(ActivatedRoute);
  booksService: BoookService = inject(BoookService);
  router: Router = inject(Router);


  book$!: Observable<Books | undefined>;

  isEditing:boolean = false;
  isLoading:boolean = true;
  errorLoadingBook:boolean = false;

  private deleteUpdateSubscription : Subscription | undefined;

  constructor() {}

  ngOnInit(){
    this.book$ = this.route.paramMap.pipe(
      tap(()=>this.isLoading=false),
      switchMap(params=>{
        const id = params.get('id')?.toString();
        if(!id){
          this.isLoading = false;
          this.errorLoadingBook = true;
          return of(undefined)
        }
        return this.booksService.getBook(id).pipe(
          tap(()=>console.log("FOUND THE BOOK DETAILS")),
          catchError(err=>{
            return of (undefined);
          })
        )
      })
    )
  }

  ngOnDestroy(){
    if(this.deleteUpdateSubscription){
      this.deleteUpdateSubscription.unsubscribe();
    }
  }

  editBook(){
    this.isEditing = true;
  }

  // No change needed here, as it accepts the unwrapped book.id and book.title
  deleteBook(bookId:string | undefined, bookTitle: string | undefined){
    if(!bookId){
      console.warn('Attempted to delete a book without an ID.');
      return;
    }

    const confirmed = confirm(`Are you sure you want to delete "${bookTitle || 'this book'}"?`);
    if(confirmed){
      this.deleteUpdateSubscription = this.booksService.deleteBook(bookId).pipe(
        tap(()=>console.log(`Book with ID ${bookId} deleted successfully.`)),
        catchError(err=>{
          console.error('Error deleting book:', err);
          alert('Failed to delete book. Please try again.');
          return EMPTY;
        })
      ).subscribe({
        next: ()=>{
          this.router.navigate(['/books']);
        },
      });
    }
  }

  // No change needed here, as it accepts the unwrapped Books object
  saveBook(bookToSave: Books) {
    if(!bookToSave || !bookToSave.id){
      console.warn('Attempted to save a book without data or ID.');
      return;
    }

    this.deleteUpdateSubscription = this.booksService.updateBook(bookToSave.id, bookToSave).pipe(
      tap((updatedBook: Books)=>{
        console.log('Book updated successfully:', updatedBook)
        // Set isEditing to false directly here after successful update
        this.isEditing = false; // Add this line
      }),
      catchError(err=>{
        console.error('Error updating book:', err);
        alert('Failed to save changes. Please try again.'); // Provide user feedback
        return EMPTY; // Return EMPTY to stop the stream on error
      })
    ).subscribe({
      next:()=>{
        this.router.navigate(['/books']);
      },
    });
  }
}
