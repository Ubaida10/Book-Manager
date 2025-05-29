import { Routes } from '@angular/router';
import { Home } from './home/home';
import {BookList} from './book-list/book-list';
import {BookItem} from './book-item/book-item';
import {AddBook} from './add-book/add-book';
import {BookDetails} from './book-details/book-details';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home'
  },
  {
    path: 'books',
    component: BookList,
    title: 'Books'
  },
  {
    path: 'add-book',
    component: AddBook,
    title: 'Add Book'
  },
  {
    path: 'book/:id',
    component: BookDetails,
    title: 'Book Details'
  }
];
