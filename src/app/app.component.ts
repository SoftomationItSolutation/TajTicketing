import { Component } from '@angular/core';
import { DataService } from './Service/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showHearder:boolean = false;
  showLoader:boolean = false;
  showLoaderValue:string = 'none';

  constructor( private objDbServ: DataService)
  {
    this.objDbServ.MasterCompDisplay.subscribe
    (
      (visibility: boolean)  => {this.showHearder = visibility;}
    );
    this.objDbServ.ShowLoaders.subscribe
    (
      (visibility: boolean)  => {this.showLoader = visibility;}
    );
  }
}


