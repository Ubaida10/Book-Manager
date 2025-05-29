import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {BoookService} from '../boook-service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-book',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})
export class AddBook {
  booksService = inject(BoookService);
  newBookForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
  });

  createNewBook(){
    this.booksService.createBook(
      this.newBookForm.value.title ?? '',
      this.newBookForm.value.author ?? '',
      this.newBookForm.value.description ?? ''
    )
  }
}
