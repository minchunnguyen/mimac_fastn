import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';

@Injectable()
export class TodoService {



  constructor(private http: Http, private router: Router) { }


  public all(): Observable<Todo[]> { 
    return this.http.get(`http://localhost:8080/todos`)
    .map(res => res.json()._embedded.todos); 
  }

  public save(todo :Todo): Observable<Todo>{
      console.log("envoi d un post");
      return this.http.post(`http://localhost:8080/todos`, todo)
      .map(res => res.json()); 
  }
}
