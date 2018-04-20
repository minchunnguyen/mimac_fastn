import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoComponent } from './component/todo/todo.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import {TodoService} from './service/todo.service';
import {HttpModule} from '@angular/http';
import {PopupModule} from 'ng2-opd-popup';
import { CookieService } from 'ngx-cookie-service';
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
import { HeaderComponent } from './component/header/header.component';
import { Globals } from './Globals';
import { DaqComponent } from './component/daq/daq.component';
import { AcquisitionComponent } from './component/acquisition/acquisition.component';
import { MenuModulesComponent } from './component/menu-modules/menu-modules.component';
import { CircuitGazComponent } from './component/circuit-gaz/circuit-gaz.component';
import { AcquisitionService } from './service/acquisition.service';
import { MonitoringComponent } from './component/monitoring/monitoring.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'todolist', component: TodoListComponent },
  { path: 'help', component: HelpComponent },
  { path: 'todo', component: TodoEditComponent },
  { path: 'todo/:todoId', component: TodoEditComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'param', component: ParameterComponent},
  { path: 'log', component: LogListComponent},
  { path: 'daq', component: DaqComponent},
  { path: 'acq', component: AcquisitionComponent},
  { path: 'circuit-gaz', component:CircuitGazComponent},
  { path: 'monitoring', component:MonitoringComponent}
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
    HeaderComponent,
    DaqComponent,
    AcquisitionComponent,
    MenuModulesComponent,
    CircuitGazComponent,
    MonitoringComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {useHash : true}),
    PopupModule.forRoot()

  ],
  providers: [TodoService, ConnexionService, LogService, Globals,CookieService, AcquisitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
