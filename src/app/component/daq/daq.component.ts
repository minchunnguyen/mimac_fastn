import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-daq',
  templateUrl: './daq.component.html',
  styleUrls: ['./daq.component.css']
})
export class DaqComponent implements OnInit {
  contenu : String;
  constructor(  private router: Router) { }

  ngOnInit() {
  }
  
  public listeLogs():void{
    this.router.navigate(['/log']);
  }

}
