import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DataService } from '../Service/data.service';
import {Response} from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Button } from 'protractor';

@Component({
  selector: 'app-menu-permission',
  templateUrl: './menu-permission.component.html',
  styleUrls: ['./menu-permission.component.css']
})
export class MenuPermissionComponent implements OnInit {
  MyMenuPermission:{MenuId,MenuName,AdminType,CounterType}[] ;
  constructor(private objDbServ: DataService, private objRoute: Router, private objCook: CookieService) { 
    this.objDbServ.MasterCompDisplay.emit(true);
  }

  ngOnInit() {
    this.GetMenus();
  }

  GetMenus(){
    this.objDbServ.CommonGetData({Id:0, Flag:'getMenuForPermission'}).subscribe(
        (response: Response)=>{
          this.MyMenuPermission = JSON.parse(response.json()).Table;
        },
        (error)=>{alert('something went wrong.');}
    );
  }

  AdminChannge(e,MenuId){
    const Value = this.MyMenuPermission.find(pm => pm.MenuId === MenuId);
    if(e.target.checked){
        Value.AdminType = 1;
    }
    else
        Value.AdminType = 0;
  }
  CounterChannge(e,MenuId){
    const Value = this.MyMenuPermission.find(pm => pm.MenuId === MenuId);
    if(e.target.checked){
        Value.CounterType = 1;
    }
    else
        Value.CounterType = 0;
  }
  UpdatePermission(){
    this.objDbServ.ShowLoaders.emit(true);
    this.objDbServ.UpdatePermission({UserId: this.objCook.get('UID'),MenuPermission:this.MyMenuPermission}).subscribe
    (
    (resp: Response) => 
    {
      const data = JSON.parse(resp.json());
      alert(data.Table[0].Meaasge);
      this.objDbServ.ShowLoaders.emit(false);
    },
    (error) => 
    {
      alert("Something went wrong.");
    this.objDbServ.ShowLoaders.emit(false);
    }
  )
 }

}
