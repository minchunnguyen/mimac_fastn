import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { ConnexionService } from '../../service/connexion.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Globals } from '../../Globals';
//import {Popup} from 'ng2-opd-popup';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  //authUser: User = new User();
  public  authUser: User = new User();

  constructor(private serviceConnex: ConnexionService, private router: Router
              ,private globals: Globals) { }

  ngOnInit() {
  }

  login():void {
    console.log(this.authUser.login +'  ' +this.authUser.pass);

    this.serviceConnex.connexion(this.authUser).subscribe(toto =>{
      this.authUser.connected = toto.result;
      //console.log('!!!!!!!!!!' + this.authUser2.connected);
      //console.log('----------' + toto.result);
      if(this.authUser.connected == 'true'){
        //this.router.navigate(['/header']);
        this.globals.is_home = false;
        this.globals.is_loggedIn = true;
      }else{
        //  this.popup.show();
      }
      localStorage.setItem("user",JSON.stringify(this.authUser));
    });
  }

 
  logOut():void{
    this.serviceConnex.deconnexion().subscribe(toto =>{
      console.log(toto.result);
      if(toto.result =='true')
      {
        this.router.navigate(['/home']);
        this.globals.is_home = true;
        this.globals.is_loggedIn = false;
      }
    },
    err => {
      console.log(err);
    }
  );
  }


  get statusHome(): boolean {
    return this.globals.is_home;
  }

  public setStatusHome(status: boolean):void{
    this.globals.is_home = status;
  }

}


