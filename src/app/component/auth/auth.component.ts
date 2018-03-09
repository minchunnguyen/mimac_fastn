import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { ConnexionService } from '../../service/connexion.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  //authUser: User = new User();
  public authUser2: User = new User();
  

  constructor(private serviceConnex: ConnexionService, private router: Router) { }

  ngOnInit() {
    /*let sampleUser: any = {
      login: 'mtnguyen' as string,
      pass: 'Mtnguyen' as string
    };
    this.serviceConnex.connexion(sampleUser).subscribe();*/
    //this.login();
  }

  login():void {
    console.log(this.authUser2.login +'  ' +this.authUser2.pass);

    this.serviceConnex.connexion(this.authUser2).subscribe(toto =>{
      this.authUser2.connected = toto.result;
      if(toto.result == 'true'){
        this.router.navigate(['/param']);
      }
      localStorage.setItem("user",JSON.stringify(this.authUser2));
    });
  }

  onLogin(): void {
    this.serviceConnex.login(this.authUser2)
    .then((user) => {
      console.log('!!!!!!!!!!');
      console.log(user.json());
    })
    .catch((err) => {
      console.log(err);
    });
  }


}


