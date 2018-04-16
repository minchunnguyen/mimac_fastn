import { Component, OnInit } from '@angular/core';
import { Parameter } from '../../model/parameter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acquisition',
  templateUrl: './acquisition.component.html',
  styleUrls: ['./acquisition.component.css']
})
export class AcquisitionComponent implements OnInit {
  parameters: Parameter;
  gaps = [512, 409, 617, 856];
  echantillons = [20, 25, 30, 35];
  nbpistes = [220, 256, 435, 557];
  pixelsizes = [220, 356, 424, 535];
  pretriggers = [20, 25, 32, 35];
  posmaxs = [128, 256, 512, 1024];
  edges = [2, 3, 4, 5];
  seuilADCs = [10,15,20,30];
  selectedGap:number = 0;
  selectedEchantil:number = 0;
  selectedNbpiste: number = 0;
  selectedPixelsize: number = 0;
  selectedPretrigger: number = 0;
  selectedPosmax:number = 0;
  selectedEdge: number = 0;
  selectedSeuilAdc: number = 0; 
  constructor(private router: Router) { 

  }

  ngOnInit() {
    this.parameters = {gap:512, echantil: 25, nbpistes:256, pixelsize: 424, pretrigger: 32, posMax:1024,
                        edge:5, selectionMode:false, seuilAdc:15, autoRestart:true,
                        numPlan: 0, numSenSor: 1, daqThreshold : 2};
  }

  setParam(param: Parameter){
    this.parameters = param;
  }

  getParam():Parameter{
    return this.parameters;
  }

  goBack(){
    this.router.navigate(['/param']);
  }
  
  public setValeurs() : void {
    this.parameters.gap = this.selectedGap;
    console.log('valeur de gap : '+ this.parameters.gap);
    
  }

  modifier(){
    this.parameters.gap = this.selectedGap;
    this.parameters.echantil = this.selectedEchantil;
    this.parameters.nbpistes = this.selectedNbpiste;
    this.parameters.pixelsize = this.selectedPixelsize;
    this.parameters.pretrigger = this.selectedPretrigger;
    this.parameters.posMax = this.selectedPosmax;
    this.parameters.edge = this.selectedEdge;
    this.parameters.seuilAdc = this.selectedSeuilAdc;

    console.log('valeur de selecteditem dans le check: '+ this.parameters.gap);
  }
  
}
