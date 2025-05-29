import { Injectable } from '@angular/core';
import {Books} from './books';

@Injectable({
  providedIn: 'root'
})
export class BoookService {
  url = 'http://localhost:3000/books';
  constructor() { }

  async getAllBooks(): Promise<Books[]>{
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getBook(id: number): Promise<Books | undefined>{
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? [];
  }

  createBook(title: string, author: string, book: Books){
    console.log(title, author, book);
  }
}
