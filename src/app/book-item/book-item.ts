import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {Books} from '../interfaces/books';

@Component({
  selector: 'app-book-item',
  imports: [
    NgIf
  ],
  templateUrl: './book-item.html',
  styleUrl: './book-item.css'
})
export class BookItem {
  @Input() book!: Books;
}
