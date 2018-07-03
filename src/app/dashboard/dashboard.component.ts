import { Component, OnInit } from '@angular/core';
import { DataService } from '../Service/data.service';
import {Response} from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Button } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  UserIdCook='';
  constructor(private objDbServ: DataService, private objRoute: Router, private objCook: CookieService) { 
    this.objDbServ.MasterCompDisplay.emit(true);
  }
  ListTicket:{}[];
  ngOnInit() {
    this.UserIdCook = this.objCook.get('Soft_Taj_UID');
    this.GetTicketData();
  }
  GetTicketData(){
    this.objDbServ.CommonGetData({Id:0, Flag:'Dashboard'}).subscribe(
      (response: Response)=>{
        this.ListTicket = JSON.parse(response.json()).Table;
      },
      (error)=>{console.log('something went wrong.');}
    );
  }
}
