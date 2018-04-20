import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { ConnexionService } from '../../service/connexion.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Globals } from '../../Globals';
import { CookieService } from 'ngx-cookie-service';
//import {Popup} from 'ng2-opd-popup';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  cookieValue = 'UNKNOWN';
  public  authUser: User = new User();

  constructor(private serviceConnex: ConnexionService, private router: Router
              ,private globals: Globals, private cookieService: CookieService) { }

  ngOnInit() {
    if(localStorage.getItem('user')!=null){
        //this.authUser.login = localStorage.getItem('user');
        this.authUser.login = localStorage.getItem('user');
        console.log("valeur de login "+ this.authUser.login);
        this.setStatusConnexion(true);
    }
  }

  login():void {
    this.serviceConnex.connexion(this.authUser).subscribe(toto =>{
      this.authUser.connected = toto.result;
      if(this.authUser.connected == 'true'){
        this.router.navigate(['/home']);
        this.setStatusConnexion(true);
      }
      localStorage.setItem('user',JSON.stringify(this.authUser.login));
    });
  }

 
  logOut():void{
    this.serviceConnex.deconnexion().subscribe(toto =>{
      console.log(toto.result);
      if(toto.result =='true')
      {
        this.router.navigate(['/home']);
        //this.globals.is_home = true;
        this.setStatusConnexion(false);
      }
    },
    err => {
      console.log(err);
    }
  );
  }

  get statusConnexion(): boolean {
    return this.globals.is_loggedIn;
  }

  public setStatusConnexion(status: boolean):void{
    this.globals.is_loggedIn = status;
  }

  /*get statusHome(): boolean {
    return this.globals.is_home;
  }

  public setStatusHome(status: boolean):void{
    this.globals.is_home = status;
  }*/

}


