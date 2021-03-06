import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcquisitionService } from '../../service/acquisition.service';
import {Popup} from 'ng2-opd-popup';
import { Acquisition } from '../../model/acquisition';
import { Globals } from '../../Globals';
import * as variable from '../../../../hello.js';
import * as chart from '../../../../D3JSCharts/MonitoringCharts.js';
import * as chart2 from '../../../../D3JSCharts/CpuLoadMonitorChart.js';
//import {D3Service, D3,ScaleLinear, Transition } from 'd3-ng2-service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  etatBtn:boolean;
  acq = new Acquisition();
  testJS :number;
  //private d3: D3;
  constructor(private serviceAcq: AcquisitionService,private router: Router,
              private popup :Popup, private globals: Globals) { }

  ngOnInit() {
    let self = this;
    //let d3 = this.d3;
    this.testJS = variable.carre(5);
    console.log("Carre: " +this.testJS);
  }

  public testHello():void{
    variable.test2(6);
    //chart2.draw_cpuLoadMonitorChart();
    //chart.updateMonitoringCharts();
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