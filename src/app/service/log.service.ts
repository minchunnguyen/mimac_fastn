import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http,Response, RequestOptions, Headers } from '@angular/http';
import { Log } from '../model/log';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LogService {

  constructor(private http: Http, private router: Router) { }

  public getLogs(){ 
    return this.http.get(`/daq/dynamic/doCommandGlobal.json?command=getLogs`)
    .map(res=>res.json());
  }

  public getParameter(){
    return this.http.get(`/daq/dynamic/doCommandSensor.json?command=getConfig&numPlan=3&numSensor=1`)
    .map(res=>res.json());
  }
}
