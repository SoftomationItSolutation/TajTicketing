import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DataService } from '../Service/data.service';
import {Response} from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Button } from 'protractor';
import { FilterPipe } from '../Filters/filter.pipe';

@Component({
  selector: 'app-cancel-ticket',
  templateUrl: './cancel-ticket.component.html',
  styleUrls: ['./cancel-ticket.component.css']
})
export class CancelTicketComponent implements OnInit {
  TicketGroup: FormGroup;
  ListTicket:{}[];
  CancelPopup:boolean = false;
  SelectedVisiterId='0';
  VisitDate= '';
  Age='';
  CurrencyId= '';
  Amount= '';
  TicketNo= '';
  SloatTiming= '';
  SerialNo
  Nationality='';
  CancelCharge='';
  ReturnAmount=0;
  TotalAmount=0
  Reason='';

  searchText:string = '';
  constructor(private objDbServ: DataService, private objRoute: Router, private objCook: CookieService) { 
    this.objDbServ.MasterCompDisplay.emit(true);
  }

  ngOnInit() {
    this.GetTicketData();
    this.TicketGroup = new FormGroup({
      TicketNo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]),
      Amount: new FormControl('', [
        Validators.required,
      ]),
      CancelCharge: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      Reason: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  GetTicketData(){
    this.objDbServ.CommonGetData({Id:0, Flag:'ModifyTicket'}).subscribe(
      (response: Response)=>{
        this.ListTicket = JSON.parse(response.json()).Table;
      },
      (error)=>{console.log('something went wrong.');}
    );
  }

  CancelTicket(VisiterId){
    this.SelectedVisiterId=VisiterId;
    this.GetTicketById();
  }
  onTicketCount(Type,val){
    if(val=='')
        val='0';   
    if(Type=='C') {
        this.TotalAmount =  (parseFloat(val) * parseFloat(this.Amount));
        this.ReturnAmount=this.TotalAmount-(this.TotalAmount *(parseFloat(this.CancelCharge)/100))
    }   
    else if(Type=='R')    {
        this.TotalAmount =  (parseFloat(this.TicketNo) * parseFloat(this.Amount));
        this.ReturnAmount=this.TotalAmount-(this.TotalAmount *(parseFloat(val)/100))
    }
    else {
       this.TotalAmount =  (parseFloat(val) * parseFloat(this.TicketNo));
       this.ReturnAmount=this.TotalAmount-(this.TotalAmount *(parseFloat(this.CancelCharge)/100))
    }
    
  }

  GetTicketById(){
    this.objDbServ.CommonGetData({Id:this.SelectedVisiterId,Flag:'TicketById'}).subscribe(
      (response: Response)=>{
        const data=JSON.parse(response.json()).Table;
        if(data.length>0)
        {
          this.VisitDate= data[0].VisitDate,
          this.CurrencyId= data[0].CurrencyId,
          this.Amount= data[0].TicketAmount,
          this.Age= data[0].VisiterAge,
          this.TicketNo= data[0].TicketCount,
          this.SloatTiming= data[0].SloatId,
          this.SerialNo=data[0].SerialNo,
          this.Nationality=data[0].Nationality;
          this.CancelCharge=data[0].CancelCharges;
          this.TotalAmount=(data[0].TicketCount*data[0].TicketAmount)
          this.ReturnAmount=(data[0].TicketCount*data[0].TicketAmount)*(data[0].CancelCharges/100);
          this.Reason='';
          this.CancelPopup=true;
        }
      },
      (error)=>{console.log('something went wrong.');}
    );

  }
  onSubmit() {
    const obj = 
    {
      VisiterId: this.SelectedVisiterId,
      TicketAmount: this.TicketGroup.value.CancelCharge,
      TicketCount: this.TicketGroup.value.TicketNo,
      SloatId: this.VisitDate,
      UserId: this.objCook.get('Soft_Taj_UID'),
      Remark: this.TicketGroup.value.Reason
      
    }
    this.objDbServ.CancelTicket(obj).subscribe(
      (response: Response)=>{
        const data = JSON.parse(response.json());
        if(data.Table.length > 0){
          if(data.Table[0].Meaasge.indexOf('successfully') > -1)
          {
            this.CancelPopup=false;
          }
          this.GetTicketData();
          alert(data.Table[0].Meaasge);
        }
        else{
          alert('something went wrong.');
        }
      },
      (error)=>{console.log('something went wrong.');}
  );

  }
}
