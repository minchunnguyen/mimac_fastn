import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
@Injectable()
export class Globals{
    is_home :boolean = true;
    is_loggedIn: boolean = false;
    module: boolean;
    title: string ="test";
}