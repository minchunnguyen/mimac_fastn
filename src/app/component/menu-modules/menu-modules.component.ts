import { Component, OnInit } from '@angular/core';
import { Globals } from '../../Globals';

@Component({
  selector: 'app-menu-modules',
  templateUrl: './menu-modules.component.html',
  styleUrls: ['./menu-modules.component.css']
})
export class MenuModulesComponent implements OnInit {

  constructor(private globals: Globals) { }

  ngOnInit() {
  }

  /*public testClick(module: String):void{
    if(module == "param"){
      this.globals.module = true;
      console.log("hola "+ this.globals.module);
    }else{
      this.globals.module = false;
      console.log("hola "+ this.globals.module);
    }
  }

  public getModule():boolean{
    return this.globals.module;
  }*/
}
