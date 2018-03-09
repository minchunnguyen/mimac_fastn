import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { User } from '../model/user';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { NgForm } from '@angular/forms';

@Injectable()
export class ConnexionService {
  private urlConnexion: string = `/daq/dynamic/connect.json`;
  private urlDeconnexion: string = `/daq/dynamic/disconnect.json`;

  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private router: Router) {

  }

  /*public connexion(user: User): Observable<User> {

    console.log("envoi d'un requete");

   return this.http.post(this.urlConnexion, "login: "+user.login +"\npass: "+user.pass).map(res => res.json());
       
  }*/

  public connexion(user: User) {

    console.log("envoi d'un requete");

   return this.http.post(this.urlConnexion + "?login="+user.login+"&pass="+user.pass,user)
              .map(res => res.json());
       
  }

  login(user:User):Promise<any>{
    return this.http.post(this.urlConnexion,user,{headers: this.headers}).toPromise();
  }

  public deconnexion() : void {
    this.http.delete(this.urlDeconnexion).map(res=>res.json());
  }

  /*public connexion2(form: NgForm):Promise<any> {

    console.log("envoi d'un requete");

    return this.http.post(this.urlConnexion,form,{headers: this.headers}).toPromise();
       
  }*/

}



/*
constructor(private http: Http) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('authentication', `hello`);

  const options = new RequestOptions({headers: headers});
  this.http.post(
    "http://localhost:3000/contacts",
    JSON.stringify({id: 4, name: 'some'}),
    options
  ).subscribe();
*/
