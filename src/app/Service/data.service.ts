import {Injectable, EventEmitter} from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class DataService {
  //apiUrl: string = 'http://localhost:56149/api/Taj/';
  apiUrl: string = 'http://192.168.0.9:4002/api/Taj/';
  globalUserid: string = '';

  //Emitors
  MasterCompDisplay = new EventEmitter<boolean>();
  ShowLoaders = new EventEmitter<boolean>();
  
  constructor(private objHttp: Http) {}
  
  CommonGetData(obj: {})
  {
    return this.objHttp.post(this.apiUrl + 'CommonGetData', obj);
  }

  login(objLogin: {}) 
  {
    return this.objHttp.post(this.apiUrl + 'ValidateUser', objLogin);
  }
  GetHeaders(objLogin: {}) 
  {
    return this.objHttp.post(this.apiUrl + 'ValidateUser', objLogin);
  }
  GetMenus(objLogin: {}) 
  {
    return this.objHttp.post(this.apiUrl + 'GetMenuDetails', objLogin);
  }
  SloatInsertUpdate(objLogin: {}) 
  {
    return this.objHttp.post(this.apiUrl + 'SloatInsertUpdate', objLogin);
  }
  CountryInsertUpdate(objLogin: {}) 
  {
    return this.objHttp.post(this.apiUrl + 'CountryMasterInsertUpdate', objLogin);
  }
  UserInsertUpdate(objLogin: {}) 
  {
    return this.objHttp.post(this.apiUrl + 'UserInsertUpdate', objLogin);
  }
  GetTicketSerialNo(objLogin: {}) 
  {
    return this.objHttp.post(this.apiUrl + 'GetTicketSerialNo', objLogin);
  }
  CreateTicket(objLogin: {}) 
  {
    return this.objHttp.post(this.apiUrl + 'GenerateTicket', objLogin);
  }
  ModifyTicket(objLogin: {}) 
  {
    return this.objHttp.post(this.apiUrl + 'ModifyTicket', objLogin);
  }
  CancelTicket(objLogin: {}) 
  {
    return this.objHttp.post(this.apiUrl + 'CancelTicket', objLogin);
  }
  UpdatePermission(objLogin: {}) 
  {
    return this.objHttp.post(this.apiUrl + 'UpdatePermission', objLogin);
  }
  UpdatePassword(objLogin: {}) 
  {
    return this.objHttp.post(this.apiUrl + 'UpdatePassword', objLogin);
  }
  GetReportData(objLogin: {}) 
  {
    return this.objHttp.post(this.apiUrl + 'GetReportData', objLogin);
  }
  GetSlotByEntryData(objLogin: {}) 
  {
    return this.objHttp.post(this.apiUrl + 'GetSlotByEntryData', objLogin);
  }
  
}
