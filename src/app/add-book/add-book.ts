import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BoookService} from '../boook-service';
import {Router} from '@angular/router';

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
  booksService = inject(BoookService);
  router: Router = inject(Router);
  //Reactive Form
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
    ).then(r => {
      this.router.navigate(['/books']);
    })
  }
}
