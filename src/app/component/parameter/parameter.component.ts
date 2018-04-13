import { Component, OnInit, Input } from '@angular/core';
import { ConnexionService } from '../../service/connexion.service';
import { Router } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { Parameter } from '../../model/parameter';
import { LogService } from '../../service/log.service';
import { Globals } from '../../Globals';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {
  param : Parameter = new Parameter();
  constructor(private serviceConnex: ConnexionService,
              private serviceParem:LogService, 
              private globals: Globals) { }

  ngOnInit() {

  }

  getConfig():void{
    this.serviceParem.getParameter().subscribe(toto =>{
      console.log(toto.result);
      this.param.numPlan = toto.numPlan;
      this.param.numSenSor = toto.numSensor;
      this.param.daqThreshold = toto.response.config.daqThreshold;
      this.param.posMax = toto.response.config.postMax;
      this.param.selectionMode = toto.response.config.selectionMode;
      if(toto.result =='true')
      {
        console.log('postMax : ' + this.param.posMax);
        console.log('daqThreshold: '+ this.param.daqThreshold);
        console.log('selectionMode: '+ this.param.selectionMode);
      }
    },
    err => {
      console.log(err);
    }
  );
  }

  setConfig():void{
      this.serviceParem.setParameter().subscribe();
  }


}
