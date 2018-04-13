import { Component, OnInit } from '@angular/core';
import { Parameter } from '../../model/parameter';

@Component({
  selector: 'app-acquisition',
  templateUrl: './acquisition.component.html',
  styleUrls: ['./acquisition.component.css']
})
export class AcquisitionComponent implements OnInit {
  parameters: Parameter[]= [];
  gap :Number[]= [];
  constructor() { 
      this.parameters[0].gap = 512;
  }

  ngOnInit() {
  }

}
