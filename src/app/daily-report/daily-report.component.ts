import { Component, OnInit } from '@angular/core';
import { DataService } from '../Service/data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {Response} from '@angular/http';
import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})


export class DailyReportComponent implements OnInit {

  constructor(private objDbServ: DataService, private objRoute: Router, private objCook: CookieService) { 
    this.objDbServ.MasterCompDisplay.emit(true);
  }
TableDisplay:boolean=false;  
ReportType='Daily';
FromDate='';
ToDate='';
FromtSlot='';
ToSlot='';
FromSlot='';
Cdate='';
SloatDetsils= '08:00 - 08:30 to 12:00 - 12:30';
Reportddl :{}[];
SloatList :{}[];
Error=true;
ToDateDis=false;
ToSlotDis=true;
FromSlotDis=true;
public colors = ['red', 'green', 'blue']
public  dataColumns = [3];
//barChartData = [ { "id": 1, "label": "08:00 - 08:30", "value1": 5, "value2": 1, "value3": 0, "TotalCount": 6 }, { "id": 2, "label": "08:30 - 09:00", "value1": 0, "value2": 0, "value3": 0, "TotalCount": 0 }, { "id": 3, "label": "09:00 - 09:30", "value1": 0, "value2": 0, "value3": 0, "TotalCount": 0 }, { "id": 4, "label": "09:30 - 10:00", "value1": 0, "value2": 0, "value3": 0, "TotalCount": 0 } ]
barChartData :any;

ReportList:{}[]
  ngOnInit() {
  setTimeout(() => {this.GetCdate();});
  }
  GetCdate(){
    this.objDbServ.ShowLoaders.emit(true);
    this.objDbServ.CommonGetData({Id:0, Flag:'ReportType'}).subscribe(
      (response: Response)=>{
        this.Cdate=JSON.parse(response.json()).Table[0].Cdate;
        this.FromDate=this.Cdate;
        this.ToDate=this.Cdate;
        this.Reportddl=JSON.parse(response.json()).Table1
        this.ReportType=JSON.parse(response.json()).Table1[0].id;
         this.SloatList=JSON.parse(response.json()).Table2;
         this.FromSlot=JSON.parse(response.json()).Table2[0].SloatId;
         this.ToSlot=JSON.parse(response.json()).Table2[0].SloatId;
        this.objDbServ.ShowLoaders.emit(false);
        
      },
      (error)=>{
        this.objDbServ.ShowLoaders.emit(false);
        alert('something went wrong.');
        
     }
    );
  }
  OnDateChnageF(val){
    this.FromDate=val;
    setTimeout(() => {this.GetReportData();});
  }
  OnDateChnageT(val){
    this.ToDate=val;
    setTimeout(() => {this.GetReportData();});

  }
  
  GetReportData(){
    this.objDbServ.ShowLoaders.emit(true);
    this.objDbServ.GetReportData({FromDate:this.FromDate,ToDate:this.ToDate,FromSlot:this.FromSlot,ToSlot:this.ToSlot,id:this.ReportType}).subscribe(
      (response: Response)=>{
        if(JSON.parse(response.json()).Table[0].Meaasge=='Success')
        {
          this.Error=false;
          this.SloatDetsils= JSON.parse(response.json()).Table1[0].SloatDetsils;
          if(this.ReportType=='4')
            this.barChartData=JSON.parse(response.json()).Table2;
          else
            this.ReportList=JSON.parse(response.json()).Table2;
        }
        else
        {
          this.Error=true;
          alert(JSON.parse(response.json()).Table[0].Meaasge);
        }
        this.objDbServ.ShowLoaders.emit(false);
      },
      (error)=>{
        console.log('something went wrong.');
        this.objDbServ.ShowLoaders.emit(false);
    }

    );
  }
  onSelectFSlot(val){
    this.FromSlot=val;
    setTimeout(() => {this.GetReportData();});
  }
  onSelectTSlot(val){
    this.ToSlot=val;
    setTimeout(() => {this.GetReportData();});
  }

  OnReportSelection(val){
    this.ReportType=val;
    if(val==1)
    {
      this.TableDisplay=false;
      this.ToDateDis=false;
      this.ToSlotDis=true;
      this.FromSlotDis=true;
    }
    else if(val==2)
    {
      this.TableDisplay=false;
      this.ToDateDis=true;
      this.ToSlotDis=false;
      this.FromSlotDis=false;
    }
    else if(val==3)
    {
      this.TableDisplay=true;
      this.ToDateDis=false;
      this.ToSlotDis=true;
      this.FromSlotDis=true;
    }
    else if(val==4)
    {
      this.TableDisplay=true;
      this.ToDateDis=false;
      this.ToSlotDis=false;
      this.FromSlotDis=false;
    }
    else{
      this.TableDisplay=true;
      this.ToDateDis=true;
      this.ToSlotDis=false;
      this.FromSlotDis=false;
    }
    this.GetReportData();
  }
  print(): void 
  {
      let printContents, popupWin;
      printContents = document.getElementById('report-print').innerHTML;
      popupWin = window.open('', '_blank', 'top=20px,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
            <title></title>
            <style>
              .linekight{line-height: 2px;}
              table{line-height: 14px;}
              thead {
                  border: 1px solid black;
                  border-collapse: collapse;
              }
              th{
                  padding: 5px;
                  text-align: center;
              }
              td {
                padding: 1px;
                text-align: left;
            }
          </style>
          </head>
          <body onload="window.print();window.close();">${printContents}</body>
        </html>`
      );
      popupWin.document.close();
  }
}
