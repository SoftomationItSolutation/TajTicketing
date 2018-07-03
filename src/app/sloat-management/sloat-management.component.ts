import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DataService } from '../Service/data.service';
import {Response} from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Button } from 'protractor';

@Component({
  selector: 'app-sloat-management',
  templateUrl: './sloat-management.component.html',
  styleUrls: ['./sloat-management.component.css']
})

export class SloatManagementComponent implements OnInit {
  UserIdCook='';
  listSloat:{}[];
  listTime:{}[];
  SloatSeat='';
  StartTime='';
  EndTime='';
  IndianA='';
  IndianC='';
  ForeignerA='';
  ForeignerC='';
  MoId = '';
  CancelCharges='';
  SloatPopup:boolean = false;
  title="Add New Slot";
  SelectedSloatId='';
  formGroup: FormGroup;
  constructor(private objDbServ: DataService, private objRoute: Router, private objCook: CookieService) { 
    this.objDbServ.MasterCompDisplay.emit(true);
  }

  ngOnInit() {
    this.GetSloatTimes();
    this.GetSloatData();
    this.UserIdCook = this.objCook.get('Soft_Taj_UID');
    this.formGroup = new FormGroup({
      SloatSeat: new FormControl('', [
        Validators.required,
      ]),
      StartTime: new FormControl('', [
        Validators.required,
      ]),
      EndTime: new FormControl('', [
        Validators.required,
      ]),
      IndianA: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(-)?(\d)+(\.(\d)+)*(%)?$/),
        Validators.min(0),
      ]),
      IndianC: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(-)?(\d)+(\.(\d)+)*(%)?$/),
        Validators.min(0),
      ]),
      ForeignerA: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(-)?(\d)+(\.(\d)+)*(%)?$/),
        Validators.min(0),
      ]),
      ForeignerC: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(-)?(\d)+(\.(\d)+)*(%)?$/),
        Validators.min(0),
      ]),
      CancelCharges: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(-)?(\d)+(\.(\d)+)*(%)?$/),
        Validators.min(0),
        Validators.max(100)
      ]),
    });
  }
  ///^[-+]?[0-9]+\.[0-9]+$/
  GetSloatTimes(){
    this.objDbServ.CommonGetData({Id:0, Flag:'TimeSloat'}).subscribe(
      (response: Response)=>{
        this.listTime = JSON.parse(response.json()).Table;
      },
      (error)=>{console.log('something went wrong.');}
    );
  }
  GetSloatData(){
    this.objDbServ.CommonGetData({Id:0, Flag:'SloatData'}).subscribe(
      (response: Response)=>{
        this.listSloat = JSON.parse(response.json()).Table;
      },
      (error)=>{console.log('something went wrong.');}
    );
  }
  openPopupForUpdate(SloatId)
  {
    this.SelectedSloatId=SloatId;
    this.GetSloatById();
  }
  GetSloatById(){
    this.objDbServ.CommonGetData({Id:this.SelectedSloatId,Flag:'SloatById'}).subscribe(
      (response: Response)=>{
        const data=JSON.parse(response.json()).Table;
        if(data.length>0)
        {
          this.SloatSeat=data[0].SloatSeat;
          this.StartTime=data[0].SloatStartTimeId;
          this.EndTime=data[0].SloatEndTimeId;
          this.IndianA=data[0].SloatAmount_Indian_Adult;
          this.IndianC=data[0].SloatAmount_Indian_Child;
          this.ForeignerA=data[0].SloatAmount_Foreigner_Adult;
          this.ForeignerC=data[0].SloatAmount_Foreigner_Child;
          this.CancelCharges=data[0].CancelCharges;
          
          this.title="Update Slot";
          this.SloatPopup = true;
        }
      },
      (error)=>{console.log('something went wrong.');}
    );
  }
  onSubmit() {
    const obj = 
    {
      SloatId: this.SelectedSloatId,
      UserId: this.UserIdCook,
      SloatSeat: this.formGroup.value.SloatSeat,
      SloatStartTime: this.formGroup.value.StartTime,
      SloatEndTime: this.formGroup.value.EndTime,
      SloatAmount_Indian_Adult: this.formGroup.value.IndianA,
      SloatAmount_Indian_Child: this.formGroup.value.IndianC,
      SloatAmount_Foreigner_Adult: this.formGroup.value.ForeignerA,
      SloatAmount_Foreigner_Child: this.formGroup.value.ForeignerC,
      CancelCharges: this.formGroup.value.CancelCharges
    }
    this.objDbServ.SloatInsertUpdate(obj).subscribe(
      (response: Response)=>{
        const data = JSON.parse(response.json());
        if(data.Table.length > 0){
          if(data.Table[0].Meaasge.indexOf('successfully') > -1)
          {
            this.GetSloatData();
            this.SloatPopup = false;
            this.SloatSeat='';
            this.StartTime='';
            this.EndTime='';
            this.IndianA='';
            this.IndianC='';
            this.ForeignerA='';
            this.ForeignerC='';
            this.SelectedSloatId='';
          }
          alert(data.Table[0].Meaasge);
        }
        else{
          alert('something went wrong.');
        }
      },
      (error)=>{console.log('something went wrong.');}
  );
  }
  onEnddate(event){
    console.log(event.value);
  }

  AddSloat(){
    this.title="Add New Slot";
    this.SloatPopup = true;
    this.SloatSeat='';
    this.StartTime='';
    this.EndTime='';
    this.IndianA='';
    this.IndianC='';
    this.ForeignerA='';
    this.ForeignerC='';
    this.SelectedSloatId='';
  }
}

