// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrainingFormComponent } from './components/training-form/training-form.component';

import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';  // Import the UserDashboardComponent
import { FormateurComponent } from './components/formateur/formateur.component';


import { EntrepriseFormComponent } from './components/entreprise-form/entreprise-form.component';
import { EntrepriseListComponent } from './components/entreprise-list/entreprise-list.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    TrainingFormComponent,

    UserDashboardComponent,
    FormateurComponent

    EntrepriseFormComponent,
    EntrepriseListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
