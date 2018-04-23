import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcquisitionService } from '../../service/acquisition.service';
import {Popup} from 'ng2-opd-popup';
import { Acquisition } from '../../model/acquisition';
import { Globals } from '../../Globals';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  etatBtn:boolean;
  acq = new Acquisition();
  constructor(private serviceAcq: AcquisitionService,private router: Router,
              private popup :Popup, private globals: Globals) { }

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

  public alert(){
    this.popup.options = {
      color:"#5cb85c",
      header:"Attention",
      confirmBtnContent:  "test",
    }
     this.popup.show(this.popup.options);
  }

  public startAcq(){
   this.acq.mode = "NORMAL";
    this.serviceAcq.startAcq(this.acq).subscribe(toto =>{
      if(toto.result == "true"){
        this.acq.numCycle = toto.response.startCycle;
        this.globals.start_acq = true;
      }
    });
   console.log("Start acq at : "+ this.acq.numCycle);
  }

  public stopAccq(){
    this.serviceAcq.stopAcq().subscribe(toto =>{
      if(toto.result == "true"){
        this.globals.start_acq = false;
      }
    });    console.log("Stop acq");
  }

  get statusAcq(): boolean{
    return this.globals.start_acq;
  }
}
