import { TodoService } from './../../service/todo.service';
import { Todo } from './../../model/todo';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {

  todo : Todo = null;
  constructor(private service : TodoService, private router: Router) { }

  ngOnInit() {
    console.log("dans edition de tache");
    if(!this.todo){
      this.todo = {name: '', completed:false};
    }
  }

  save(){
    console.log("bouton save appuye");
   // this.todo.name = form.value.todo;
   // this.todo.name = "tacheEcriteEnDur";
   // this.todo.completed = false;
    this.service.save(this.todo).subscribe();
    this.router.navigate(['/todolist']);

  }

}
