import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DataService } from '../Service/data.service';
import {Response} from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Button } from 'protractor';


@Component({
  selector: 'app-country-management',
  templateUrl: './country-management.component.html',
  styleUrls: ['./country-management.component.css']
})
export class CountryManagementComponent implements OnInit {
  UserIdCook='';
  listCountry:{}[];
  CountryName='';
  CountryCode='';

  CountryPopup:boolean = false;
  title="Add New Country";
  SelectedCountryId=0;
  formGroup: FormGroup;
  constructor(private objDbServ: DataService, private objRoute: Router, private objCook: CookieService) { 
    this.objDbServ.MasterCompDisplay.emit(true);
  }

  ngOnInit() {
    this.GetCountryData();
    this.UserIdCook = this.objCook.get('Soft_Taj_UID');
    this.formGroup = new FormGroup({
      CountryName: new FormControl('', [
        Validators.required,
      ]),
      CountryCode: new FormControl('', [
        Validators.required,
      ])
      
    });
  }
  GetCountryData(){
    this.objDbServ.CommonGetData({Id:0, Flag:'CountryData'}).subscribe(
      (response: Response)=>{
        this.listCountry = JSON.parse(response.json()).Table;
      },
      (error)=>{console.log('something went wrong.');}
    );
  }
  openPopupForUpdate(CountryId)
  {
    this.SelectedCountryId=CountryId;
    this.GetCountryById();
  }
  GetCountryById(){
    this.objDbServ.CommonGetData({Id:this.SelectedCountryId,Flag:'CountryById'}).subscribe(
      (response: Response)=>{
        const data=JSON.parse(response.json()).Table;
        if(data.length>0)
        {
          this.CountryName=data[0].CountryName;
          this.CountryCode=data[0].CountryCode;
          this.title="Update Country";
          this.CountryPopup = true;
        }
      },
      (error)=>{console.log('something went wrong.');}
    );
  }
  onSubmit() {
    const obj = 
    {
      CountryId: this.SelectedCountryId,
      UserId: this.UserIdCook,
      CountryName: this.formGroup.value.CountryName,
      CountryCode: this.formGroup.value.CountryCode,
    }
    this.objDbServ.CountryInsertUpdate(obj).subscribe(
      (response: Response)=>{
        const data = JSON.parse(response.json());
        if(data.Table.length > 0){
          if(data.Table[0].Meaasge.indexOf('successfully') > -1)
          {
            this.GetCountryData();
            this.CountryPopup = false;
            this.CountryName='';
            this.CountryCode='';
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

  AddCountry(){
    this.title="Add New Sloat";
    this.CountryPopup = true;
    this.CountryName='';
    this.CountryCode='';
    this.SelectedCountryId=0;
    this.GetCountryById();
  }

}
