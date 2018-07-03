import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, AbstractControl} from "@angular/forms";
import { DataService } from '../Service/data.service';
import {Response} from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Button } from 'protractor';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  actionFlag='';
  UserIdCook='';
  listUser:{}[];
  listUserType:{}[];
  FirstName='';
  LoginId='';
  Password='';
  ConfirmPassword='';
  EmailId='';
  ContactNo='';
  UserType='';
  UserPopup:boolean = false;
  title="Add New User";
  SelectedUserId='';
  formGroup: FormGroup;
  constructor(private objDbServ: DataService, private objRoute: Router, private objCook: CookieService) { 
    this.objDbServ.MasterCompDisplay.emit(true);
  }

  ngOnInit() {
    this.GetUserType();
    this.GetUserData();
    this.UserIdCook = this.objCook.get('Soft_Taj_UID');
    //Template driven validation/Model Driven Validation
    this.formGroup = new FormGroup({
      FirstName: new FormControl('', [
        Validators.required,
      ]),
      LoginId: new FormControl('', [
        Validators.required,
      ]),
      Password: new FormControl('', [
        Validators.required,
      ]),
      EmailId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ]),
      ContactNo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
      ]),
      UserType: new FormControl('', [
        Validators.required,
      ]),
      
    });
  }

  GetUserType(){
    this.objDbServ.CommonGetData({Id:0, Flag:'DepartmentList'}).subscribe(
      (response: Response)=>{
        this.listUserType = JSON.parse(response.json()).Table;
      },
      (error)=>{console.log('something went wrong.');}
    );
  }
  GetUserData(){
    this.objDbServ.CommonGetData({Id:0, Flag:'UserData'}).subscribe(
      (response: Response)=>{
        this.listUser = JSON.parse(response.json()).Table;
      },
      (error)=>{console.log('something went wrong.');}
    );
  }
  openPopupForUpdate(CountryId)
  {
    this.actionFlag='update';
    this.SelectedUserId=CountryId;
    this.GetUserById();
  }
  GetUserById(){
    this.objDbServ.CommonGetData({Id:this.SelectedUserId,Flag:'UserById'}).subscribe(
      (response: Response)=>{
        const data=JSON.parse(response.json()).Table;
        if(data.length>0)
        {
          this.FirstName=data[0].Name;
          this.LoginId='test';
          this.Password='test';
          this.ConfirmPassword='test';
          this.EmailId=data[0].EmailId;
          this.ContactNo=data[0].ContactNo;
          this.UserType=data[0].DepartmentId;
          this.title="Update User Details";
          this.UserPopup = true;
        }
      },
      (error)=>{console.log('something went wrong.');}
    );
  }
  onSubmit() {
    const obj = 
    {
      UserId: this.SelectedUserId,
      AUserId: this.UserIdCook,
      DepartmentId:this.formGroup.value.UserType,
      LoginId: this.formGroup.value.LoginId,
      Password: this.formGroup.value.Password,
      EmailId: this.formGroup.value.EmailId,
      ContactNo: this.formGroup.value.ContactNo,
      Name: this.formGroup.value.FirstName,
    }
    this.objDbServ.UserInsertUpdate(obj).subscribe(
      (response: Response)=>{
        const data = JSON.parse(response.json());
        if(data.Table.length > 0){
          if(data.Table[0].Meaasge.indexOf('successfully') > -1)
          {
            this.GetUserData();
            this.UserPopup = false;
            this.FirstName='';
            this.LoginId='';
            this.Password='';
            this.ConfirmPassword='';
            this.EmailId='';
            this.ContactNo='';
            this.UserType='';
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

  AddUser(){
    this.actionFlag='Add';
    this.SelectedUserId='';
    this.title="Add New User";
    this.UserPopup = true;
    this.FirstName='';
    this.LoginId='';
    this.Password='';
    this.ConfirmPassword='';
    this.EmailId='';
    this.ContactNo='';
    this.UserType='';
  }
}
