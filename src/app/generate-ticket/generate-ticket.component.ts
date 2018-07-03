import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DataService } from '../Service/data.service';
import {Response} from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Button } from 'protractor';
declare var $:any;

@Component({
  selector: 'app-generate-ticket',
  templateUrl: './generate-ticket.component.html',
  styleUrls: ['./generate-ticket.component.css']
})
export class GenerateTicketComponent implements OnInit {
  TicketGroup: FormGroup;
  TicketNo='1';
  VisitorName='';
  VisitorAge='';
  GenderId='';
  CountryId='';
  Nationality='1';
  PassportNo='N/A';
  CurrencyId='1';
  Address='';
  Amount='0.00';
  TotalAmount='0';
  SloatList:{}[]
  SloatAvailableList:{}[]
  MainSloatAvailableList:{}[]
  GenderList:{}[]
  CountryList:{}[]
  CurrencyList:{}[]
  AmountList:{SloatAmount_Indian_Adult,SloatAmount_Indian_Child,SloatAmount_Foreigner_Adult,SloatAmount_Foreigner_Child}[]
  SloatId:'';
  SerialNo='';
  Cdate='';
  Tdate='';
  CTime='';
  DefaultCountryId='';
  VisitDate=new Date().toString();
  PrintList:{}[]
  ChildMinAge=4;
  ChildMaxAge=15;
  PrintData:{}[];
  PrintDate='28/12/2018';
  PrintTime='8:00 8:30';
  PrintTicketNo='1';
  PrintName='Hemant Pundir';
  PrintSex='Male';
  PrintAge='50';
  PrintNationality='Indian';
  PrintPassportNo='N/A';
  PrintRate='510';
  PrintCountryName='AUS';


  constructor(private objDbServ: DataService, private objRoute: Router, private objCook: CookieService) { 
    this.objDbServ.MasterCompDisplay.emit(true);
  }

  ngOnInit() {
    this.TicketMasterData();
    
    this.TicketGroup = new FormGroup({
      TicketNo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]),
      SloatId: new FormControl('', [
        Validators.required,
      ]),
      VisitorName: new FormControl('', [
        Validators.required,
      ]),
      VisitorAge: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.min(0),
      ]),
      GenderId: new FormControl('', [
        Validators.required,
      ]),
      CountryId: new FormControl('', [
        Validators.required,
      ]),
      Nationality: new FormControl('', [
        Validators.required,
      ]),
      PassportNo: new FormControl('', [
        Validators.required,
      ]),
      CurrencyId: new FormControl('', [
        Validators.required,
      ]),
      Address: new FormControl('', [
        Validators.required,
      ]),
      Amount: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(-)?(\d)+(\.(\d)+)*(%)?$/),
        Validators.min(0),
      ]),
    });
  }
  TicketMasterData(){
    this.VisitDate=new Date().toString();
    this.objDbServ.CommonGetData({Id:0, Flag:'TicketMasterData'}).subscribe(
      (response: Response)=>{
        this.Cdate=JSON.parse(response.json()).Table[0].Cdate;
        this.Tdate=JSON.parse(response.json()).Table[0].Tdate;
        this.CTime = JSON.parse(response.json()).Table[0].CTime
        this.ChildMinAge= JSON.parse(response.json()).Table[0].MinChildAge
        this.ChildMaxAge= JSON.parse(response.json()).Table[0].MaxChildAge
        this.DefaultCountryId= JSON.parse(response.json()).Table[0].DefaultCountryId
        this.VisitDate=this.Tdate;
        this.SloatData();
        this.CountryId=this.DefaultCountryId;
        this.GenderList = JSON.parse(response.json()).Table1;
        this.CountryList= JSON.parse(response.json()).Table2;
        this.CurrencyList= JSON.parse(response.json()).Table3;
      },
     
    );
  }
  SloatData(){
    this.objDbServ.CommonGetData({Id:0, Flag:'SloatDataBYShift'}).subscribe(
      (response: Response)=>{
        this.SloatId=JSON.parse(response.json()).Table[0].SloatId
        this.SloatList = JSON.parse(response.json()).Table;
        this.SloatDataById();
      },
      (error)=>{console.log('something went wrong.');}
    );
  }
  
  SloatDataById(){
    this.objDbServ.GetTicketSerialNo({VisitDate:this.VisitDate, SloatId:this.SloatId}).subscribe(
      (response: Response)=>{
        this.SerialNo=JSON.parse(response.json()).Table[0].SerialNo
        this.MainSloatAvailableList = JSON.parse(response.json()).Table1;
        this.SloatAvailableList=this.MainSloatAvailableList;
        this.AmountList = JSON.parse(response.json()).Table5;
        if(this.CountryId==this.DefaultCountryId)
          this.Amount=this.AmountList[0].SloatAmount_Indian_Adult;
        else
          this.Amount=this.AmountList[0].SloatAmount_Foreigner_Adult;

        this.TotalAmount=(parseFloat(this.Amount) * parseFloat(this.TicketNo)).toString();
        
      },
      (error)=>{console.log('something went wrong.');}
    );
  }
  onTicketCount(Type,val){
    if(val=='')
        val='0';   
    if(Type=='C')    
      this.TotalAmount=(parseFloat(val)* parseFloat(this.Amount)).toString();
    else
      this.TotalAmount=(parseFloat(val)* parseFloat(this.TicketNo)).toString();
    
  }
  onSelectSloat(SloatId){
    this.SloatAvailableList=this.MainSloatAvailableList;
    this.SloatDataById();

  }
  OnDateChnage(val)
  {
    this.VisitDate=val;
    this.SloatDataById();
  }
  onChildAge(age){
    this.VisitorAge=age;
    if(parseInt(this.VisitorAge)>this.ChildMaxAge){
      if(this.CountryId==this.DefaultCountryId){
        this.Amount=this.AmountList[0].SloatAmount_Indian_Adult;
      }
      else{
        this.Amount=this.AmountList[0].SloatAmount_Foreigner_Adult;
      }
    }
    else if(parseInt(this.VisitorAge)<=this.ChildMaxAge && parseInt(this.VisitorAge)>=this.ChildMinAge){
      if(this.CountryId==this.DefaultCountryId){
        this.Amount=this.AmountList[0].SloatAmount_Indian_Child;
      }
      else{
        this.Amount=this.AmountList[0].SloatAmount_Foreigner_Child;
      }
    }
    else{
      this.Amount='0.00';
    }
    this.TotalAmount=(parseFloat(this.Amount) * parseFloat(this.TicketNo)).toString();
  }
  onSelectCountry(val){
    if(val==this.DefaultCountryId){
      this.Nationality='1';
      this.PassportNo='N/A';
      if(parseInt(this.VisitorAge)>this.ChildMaxAge){
        this.Amount=this.AmountList[0].SloatAmount_Indian_Adult;
      }
      else if(parseInt(this.VisitorAge)<=this.ChildMaxAge && parseInt(this.VisitorAge)>=this.ChildMinAge){
        this.Amount=this.AmountList[0].SloatAmount_Indian_Child;
      }
      else{
        this.Amount='0.00';
      }
    }
    else
    { 
      this.Nationality='2';
      this.PassportNo='';
      if(parseInt(this.VisitorAge)>this.ChildMaxAge){
        this.Amount=this.AmountList[0].SloatAmount_Foreigner_Adult;
      }
      else if(parseInt(this.VisitorAge)<=this.ChildMaxAge && parseInt(this.VisitorAge)>=this.ChildMinAge){
        this.Amount=this.AmountList[0].SloatAmount_Foreigner_Child;
      }
      else{
        this.Amount='0.00';
      }
    }
    this.TotalAmount=(parseFloat(this.Amount) * parseFloat(this.TicketNo)).toString();
  }

  onSubmit() {
    const obj = 
    {
      VisiterName: this.TicketGroup.value.VisitorName,
      GenderId: this.TicketGroup.value.GenderId,
      VisiterAge: this.TicketGroup.value.VisitorAge,
      VisitDate: this.VisitDate,
      VisiterPassportNo: this.TicketGroup.value.PassportNo,
      VisiterAddress: this.TicketGroup.value.Address,
      CountryId: this.TicketGroup.value.CountryId,
      CurrencyId: this.TicketGroup.value.CurrencyId,
      TicketAmount: this.TicketGroup.value.Amount,
      TicketCount: this.TicketGroup.value.TicketNo,
      SloatId: this.TicketGroup.value.SloatId,
      UserId: this.objCook.get('Soft_Taj_UID'),
    }
    this.objDbServ.CreateTicket(obj).subscribe(
      (response: Response)=>{
        const data = JSON.parse(response.json());
        if(data.Table.length > 0){
          if(data.Table[0].Meaasge.indexOf('successfully') > -1)
          {
            document.getElementById('VisitorName').focus();
            this.PrintData=JSON.parse(response.json()).Table1;
            this.PrintDate=JSON.parse(response.json()).Table1[0].VisitDate;
            this.PrintTime=JSON.parse(response.json()).Table1[0].SloatTime;
            this.PrintTicketNo=JSON.parse(response.json()).Table1[0].SerialNo;
            this.PrintName=JSON.parse(response.json()).Table1[0].VisiterName;
            this.PrintSex=JSON.parse(response.json()).Table1[0].GenderName;
            this.PrintAge=JSON.parse(response.json()).Table1[0].VisiterAge;
            this.PrintNationality=JSON.parse(response.json()).Table1[0].Nationality;
            this.PrintPassportNo=JSON.parse(response.json()).Table1[0].VisiterPassportNo;
            this.PrintRate=JSON.parse(response.json()).Table1[0].TotalAmount;
            this.PrintCountryName=JSON.parse(response.json()).Table1[0].CountryName;
            
            this.SloatDataById();
            this.VisitorName='';
            this.GenderId='';
            this.VisitorAge='';
            if(this.Nationality=='1')
              this.PassportNo='N/A';
            else
              this.PassportNo='';
            //this.Address='';
            this.TicketNo='1';
            
            setTimeout(() => {
              this.print();
            }, 2000);
          }
          else{
            alert(data.Table[0].Meaasge);
            }
         
        }
        else{
          alert('something went wrong.');
        }
      },
      (error)=>{console.log('something went wrong.');}
  );

  }

  print(): void 
  {
      let printContents, popupWin;
      printContents = document.getElementById('print-section').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
            <title></title>
            <style>
            *{
              box-sizing:border-box;
              line-height: 5mm;
              font-weight: bold;
          }
          .PageSize{
              width: 210mm;
              height: 297mm;
          }
          .main-ticket-container{
              width: 250mm;
              height: 93mm;
              padding: 1mm;
              transform: rotate(90deg);
              transform-origin: 28% 84%;
              background-color: #fff;
          }
          div.ticket-left{
              width: 130mm;
              float: left;
              height: 80mm;
             
          }
          div.ticket-middle{
              width: 54mm;
              float: left;
              height: 80mm;
             
          }
          div.ticket-right{
              width: 54mm;
              float: left;
              height: 80mm;
            
          }
          
          table tr td{
              vertical-align: top;
          }
          
          table.ticket-left tr td:nth-child(1){
              width: 15mm;
          }
          table.ticket-left tr td:nth-child(2){
              width: 35mm;
          }
          table.ticket-left tr td:nth-child(3){
              width: 15mm;
          }
          table.ticket-left tr td:nth-child(4){
              width: 28mm;
          }
          table.ticket-left tr td:nth-child(5){
              width: 25mm;
          }
          table.ticket-left tr td:nth-child(6){
              width: 15mm;
          }
          
          
          table.ticket-date tr td:nth-child(1){
              width: 26mm;
          }
          div.ticket-details table:not(.ticket-date) td{
              line-height: 4mm;
              height: 9mm;
              width: 100%;
              font-size: 14px;
          }
          table.tbl-time tr td:nth-child(1){
              min-width: 15mm;
              width: 15mm;
          }
          table.tbl-name tr td:nth-child(1){
              min-width: 18mm;
              width: 18mm;
          }
          table.tbl-sex tr td:nth-child(1){
              min-width: 12mm;
              width: 12mm;
          }
          table.tbl-age tr td:nth-child(1){
              min-width: 13mm;
              width: 13mm;
          }
          table.tbl-nationality tr td:nth-child(1){
              min-width: 30mm;
              width: 30mm;
          }
          table.tbl-pp tr td:nth-child(1){
              min-width: 20mm;
              width: 20mm;
          }
          table.tbl-rate tr td:nth-child(1){
              min-width: 15mm;
              width: 15mm;
          }
          
          div.ticket-right table{
              margin-bottom: 3mm;
          }
            </style>
          </head>
      <body onload="window.print();window.close();">${printContents}</body>
        </html>`
      );
      popupWin.document.close();
  }
}
