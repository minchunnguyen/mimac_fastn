import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcquisitionService } from '../../service/acquisition.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  etatBtn:boolean;
  constructor(private serviceAcq: AcquisitionService,private router: Router) { }

  ngOnInit() {
  }

  public  etatBouton(): void {
    if(this.etatBtn == false){
      this.etatBtn = true;
    }else{
      this.etatBtn = false;
    }
  }

  public setBouton(btn : boolean){
    this.etatBtn = btn;
  }

  public getBouton(): boolean{
    return this.etatBtn ;
  }

  public startAcq(){
    /*envoie la requête au backend (par méthode POST ?) pour lançer l'acquisistion, si la réponse est oui 
    => change état de bouton 
    => il faut avoir un objet qui contient les champs : type de commande, startCycle
    */

   console.log("Start acq");
  }

  public stopAccq(){
    console.log("Stop acq");
  }

}
