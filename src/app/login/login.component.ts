import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {DataService } from '../Service/data.service';
import {Response} from '@angular/http';
import {CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  LogId='';
  constructor(private objRoute: Router, private objDbServ: DataService, private objCook: CookieService) {
    this.objDbServ.MasterCompDisplay.emit(false);
   
  }

  ngOnInit() {
    this.objCook.set('Soft_Taj_URL', '');
    this.LogId = this.objCook.get('Soft_Taj_LogId');
    this.formGroup = new FormGroup({
      LoginId: new FormControl(this.LogId, [
        Validators.required,
      ]),
      Password: new FormControl('', [
        Validators.required,
      ]),
      Remember: new FormControl()
    });
  }
  onSubmit() {
      this.objDbServ.login({LoginId: this.formGroup.value.LoginId, Password: this.formGroup.value.Password}).subscribe(
        (response: Response)=>{
          const data = JSON.parse(response.json());
          if(data.length > 0){
            this.objDbServ.globalUserid = data[0].UserId;
             this.objRoute.navigate([data[0].Redirect]);
             this.objCook.set('Soft_Taj_UID', data[0].UserId);
            if(this.formGroup.value.Remember)
              this.objCook.set('Soft_Taj_LogId', this.formGroup.value.LoginId);
          }
          else{
            alert('Invalid credentials');
          }
        },
        (error)=>{console.log('something went wrong.');}
    );
  }
}
