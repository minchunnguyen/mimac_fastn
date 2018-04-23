import { Component, OnInit } from '@angular/core';
import { CircuitGaz } from '../../model/circuitGaz';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-circuit-gaz',
  templateUrl: './circuit-gaz.component.html',
  styleUrls: ['./circuit-gaz.component.css']
})
export class CircuitGazComponent implements OnInit {
  parameters: CircuitGaz;
  tabs_gaz = [512, 409, 617, 856];
  pressions = [500, 600, 700, 800];
  modeCirculations = ["Non","Oui"];
  selectedGaz:number = 0;
  selectedPression:number = 0;
  selectedMode: String = "Non";
  constructor(private router: Router, private _location: Location) { }

  ngOnInit() {
    this.parameters = {gaz:512, pression: 25, mode_circulation:"non"};
  }

  goBack(){
    this.router.navigate(['/']);
  }
  
  modifier(){
    this.parameters.gaz = this.selectedGaz;
    this.parameters.pression = this.selectedPression;
    this.parameters.mode_circulation = this.selectedMode;
  }
}
