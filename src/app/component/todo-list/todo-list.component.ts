import { Component, OnInit } from '@angular/core';
import { Todo } from '../../model/todo';
import { TodoService } from '../../service/todo.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

 constructor(private service : TodoService) {}
 //constructor(){}

  ngOnInit() {
 /*   this.todos = [{id:1, name:'tache1', completed:true},
    {id:2, name:'tache2', completed:false},
    {name:'tache3', completed:false}
    ];
    */
   this.service.all().subscribe(value => this.todos = value);
  
  }

}
