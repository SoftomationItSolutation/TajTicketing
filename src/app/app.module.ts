import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng2OrderModule} from 'ng2-order-pipe';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
//import { DoughnutChartComponent, PieChartComponent, BarChartComponent } from 'angular-d3-charts';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DataService } from './Service/data.service';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SloatManagementComponent } from './sloat-management/sloat-management.component';
import { CountryManagementComponent } from './country-management/country-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { GenerateTicketComponent } from './generate-ticket/generate-ticket.component';
import { ModifyTicketComponent } from './modify-ticket/modify-ticket.component';
import { CancelTicketComponent } from './cancel-ticket/cancel-ticket.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { MenuPermissionComponent } from './menu-permission/menu-permission.component';
import { FilterPipe } from './Filters/filter.pipe';


const appRoutes = [
  {path: '', component: LoginComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'SlotManagement', component: SloatManagementComponent},
  {path: 'CountryManagement', component: CountryManagementComponent},
  {path: 'UserManagement', component: UserManagementComponent},
  {path: 'MenuPermission', component: MenuPermissionComponent},
  {path: 'GenerateTicket', component: GenerateTicketComponent},
  {path: 'ModifyTicket', component: ModifyTicketComponent},
  {path: 'CancelTicket', component: CancelTicketComponent},
  {path: 'DailyReport', component: DailyReportComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LeftPanelComponent,
    HeaderComponent,
    DashboardComponent,
    SloatManagementComponent,
    CountryManagementComponent,
    UserManagementComponent,
    GenerateTicketComponent,
    ModifyTicketComponent,
    CancelTicketComponent,
    DailyReportComponent,
    MenuPermissionComponent,
    FilterPipe,
    // DoughnutChartComponent, 
    // PieChartComponent, 
    // BarChartComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule, 
    HttpModule, 
    FormsModule, 
    ReactiveFormsModule,
    AngularFontAwesomeModule, 
    Ng2OrderModule,
    BsDatepickerModule.forRoot(),
    NgBootstrapFormValidationModule.forRoot()
  ],
  providers: [
    DataService,
    CookieService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
