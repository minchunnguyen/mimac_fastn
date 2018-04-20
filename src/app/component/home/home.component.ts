import { Component, OnInit } from '@angular/core';
import { Globals } from '../../Globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private globals: Globals) { }

  ngOnInit() {
    this.globals.is_home = true;
  }

}
