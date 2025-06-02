import { Routes } from '@angular/router';
import { Home } from './home/home';
import {BookList} from './book-list/book-list';
import {AddBook} from './add-book/add-book';
import {BookDetails} from './book-details/book-details';
import {PageNotFound} from './page-not-found/page-not-found';
import {LoginComponent} from './login-component/login-component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'home',
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
  },
  {
    path: '**',
    component: PageNotFound,
    title: 'Page not found'
  },
];
