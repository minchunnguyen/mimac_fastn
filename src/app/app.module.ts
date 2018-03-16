import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoComponent } from './component/todo/todo.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import {TodoService} from './service/todo.service';
import {HttpModule} from '@angular/http';
import { HomeComponent } from './component/home/home.component';
import { HelpComponent } from './component/help/help.component'
import { RouterModule, Routes } from '@angular/router';
import { TodoEditComponent } from './component/todo-edit/todo-edit.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './component/auth/auth.component';
import {ConnexionService} from './service/connexion.service';
import {HttpClientModule} from '@angular/common/http';
import { ParameterComponent } from './component/parameter/parameter.component';
import { LogListComponent } from './component/log-list/log-list.component';
import { LogService } from './service/log.service';


export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'todolist', component: TodoListComponent },
  { path: 'help', component: HelpComponent },
  { path: 'todo', component: TodoEditComponent },
  { path: 'todo/:todoId', component: TodoEditComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'param', component: ParameterComponent},
  { path: 'log', component: LogListComponent}

];



@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoListComponent,
    HomeComponent,
    HelpComponent,
    TodoEditComponent,
    AuthComponent,
    ParameterComponent,
    LogListComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {useHash : true})
  ],
  providers: [TodoService, ConnexionService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
