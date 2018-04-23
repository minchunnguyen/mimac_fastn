import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Acquisition } from '../model/acquisition';

@Injectable()
export class AcquisitionService {
  private urlAcquisition: string = `/daq/dynamic/doCommandGlobal.json`;

  constructor(private http: Http, private router: Router) { }

  public startAcq(acq: Acquisition) {

    console.log("envoi d'un requete");
   return this.http.post(this.urlAcquisition + "?mode="+acq.mode+"&comment="+"&command=startAcquisition", acq)
              .map(res => res.json()); 
  }

  public stopAcq() {
   return this.http.get(this.urlAcquisition + "?command=stopAcquisition")
              .map(res => res.json()); 
  }

}
