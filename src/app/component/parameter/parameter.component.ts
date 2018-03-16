import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../../service/connexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {

  constructor(private serviceConnex: ConnexionService, private router: Router) { }

  ngOnInit() {
  }

  public logOut():void{
    this.serviceConnex.deconnexion();
    this.router.navigate(['/auth']);
  }
  public listeLogs():void{
    this.router.navigate(['/log']);
  }
  

}
