import { Component, OnInit } from '@angular/core';
import {Response} from '@angular/http';
import { DataService } from '../Service/data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  selectedMenuUrl='';
  arrMenus: any[] ;
  UserIdCook: string;
  constructor(private objDbServ: DataService, private objRoute: Router, private objCook: CookieService) { }

  ngOnInit() {
    this.UserIdCook = this.objCook.get('Soft_Taj_UID');
    this.selectedMenuUrl= this.objCook.get('Soft_Taj_URL');
    this.GetMenus();
  }

  GetMenus(){
    this.objDbServ.GetMenus({UserID: this.UserIdCook}).subscribe(
        (response: Response)=>{
          if(this.selectedMenuUrl=='') 
            this.selectedMenuUrl=JSON.parse(response.json()).Table[0].URL
          this.arrMenus = JSON.parse(response.json()).Table;
          if( this.arrMenus.length == 0){
            alert('Something wrong went while getting menus.');
          }
        },
        (error)=>{alert('something went wrong.');}
    );
  }
  showContentPage(componentToOpen:string){
    if(componentToOpen != '' && componentToOpen != null){
      this.objRoute.navigate([componentToOpen]);    
      this.selectedMenuUrl=componentToOpen;
      this.objCook.set('Soft_Taj_URL', this.selectedMenuUrl);
    }
    else{
      alert('Nothing to redirect');
    }
  }

}
