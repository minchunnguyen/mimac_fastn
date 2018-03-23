import { Component, OnInit, Input } from '@angular/core';
import { ConnexionService } from '../../service/connexion.service';
import { Router } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { Parameter } from '../../model/parameter';
import { LogService } from '../../service/log.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {
  constructor(private serviceConnex: ConnexionService,
              private serviceParem:LogService, private router: Router) { }

  ngOnInit() {

  }

  logOut():void{
    this.serviceConnex.deconnexion().subscribe(toto =>{
      console.log(toto.result);
      if(toto.result =='true')
      {
        this.router.navigate(['/auth']);
      }
    },
    err => {
      console.log(err);
    }
  );
  }


  getConfig():void{
    this.serviceParem.getParameter().subscribe(toto =>{
      console.log(toto.result);
      if(toto.result =='true')
      {
        //console.log('daqthresholdLOCAL!!!!!!!!!!!!!!!!'+this.parameter.daqThreshold);
        console.log('daqthreshold!!!!!!!!!!!!!!!!'+toto.response.config.daqThreshold);
      }
    },
    err => {
      console.log(err);
    }
  );
  }
  
  public listeLogs():void{
    this.router.navigate(['/log']);
  }
  

}
