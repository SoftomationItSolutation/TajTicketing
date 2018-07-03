import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DataService } from '../Service/data.service';
import {Response} from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Button } from 'protractor';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ChnagePassword: FormGroup;
  OldPassword='';
  NewPassword='';
  CPassword='';
  constructor(private objDbServ: DataService, private objRoute: Router, private objCook: CookieService) { 
    
  }

  ngOnInit() {
    this.ChnagePassword = new FormGroup({
      OldPassword: new FormControl('', [
        Validators.required,
      ]),
      NewPassword: new FormControl('', [
        Validators.required,
      ]),
      CPassword: new FormControl('', [
        Validators.required,
      ]),
    });
  }
  logoff(){
    if (confirm("Do you want to logout?") == true) {
      this.objRoute.navigate(['']);
    }
  }

  
  onSubmit(){
    if(this.ChnagePassword.value.NewPassword==this.ChnagePassword.value.CPassword){
    const obj = 
    {
      UserId: this.objCook.get('Soft_Taj_UID'),
      Password: this.ChnagePassword.value.OldPassword,
      NewPassword: this.ChnagePassword.value.NewPassword
    }
    this.objDbServ.UpdatePassword(obj).subscribe(
      (response: Response)=>{
        const data = JSON.parse(response.json());
        alert(data[0].Meaasge);
        this.OldPassword='';
        this.NewPassword='';
        this.CPassword='';
      },
      (error)=>{console.log('something went wrong.');}
    );
    }
    else{
        alert('Confirm password is not matched');
      }
  }
  
}
