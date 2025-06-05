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

  async getBook(id: string): Promise<Books | undefined>{
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? [];
  }

  async createBook(title:string, author:string, description:string): Promise<Books>{
    const book = {title, author, description};
    const res = await fetch(this.url, {
      method: 'POST',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(book)
    });
    return await res.json()??[];
  }

  async updateBook(id:string, books: Books): Promise<Books>{
    const res = await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(books)
    });
    return await res.json()??[];
  }


  async patchBook(id:number, partialBook: Partial<Books>): Promise<Books>{
    const res = await fetch(`${this.url}/${id}`, {
      method: 'PATCH',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(partialBook)
    });
    return await res.json()??[];
  }

  async deleteBook(id:string){
    const res = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify({id})
    });
    return await res.json()??[];
  }
}
