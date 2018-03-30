import { Component, OnInit } from '@angular/core';
import { Globals } from '../../Globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor( private globals: Globals) { }

  ngOnInit() {
    console.log("title: " + this.globals.title);

  }

}
