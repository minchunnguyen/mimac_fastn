import { Component, OnInit } from '@angular/core';
import { Log } from '../../model/log';
import { LogService } from '../../service/log.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {
  logs: Log[] = [];
  constructor(private service : LogService) { }

  ngOnInit() {

    this.service.getLogs().subscribe(toto =>{
        this.logs = toto.response.data;
        console.log(this.logs);
      },
      err => {
        console.log(err);
      }
    );

  }

}
