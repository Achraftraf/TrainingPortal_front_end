// app.module.ts

import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'; 
import { PlanificationComponent } from './components/planification/planification.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrainerDashboardComponent } from './components/trainer-dashboard/trainer-dashboard.component';
import { AssistantDashboardComponent } from './components/assistant-dashboard/assistant-dashboard.component';
import { TrainingFormComponent } from './components/training-form/training-form.component';
import { TrainingListComponent } from './components/training-list/training-list.component';

import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';  // Import the UserDashboardComponent
import { FormateurComponent } from './components/formateur/formateur.component';
import { DateSelectionDialogComponent  } from './components/date-selection-dialog/date-selection-dialog.component';
import { PopupComponent  } from './components/popup/popup.component';


import { MatSelectModule } from '@angular/material/select'; 

import { AccueilComponent } from './components/accueil/accueil.component';
import { EntrepriseFormComponent } from './components/entreprise-form/entreprise-form.component';
import { EntrepriseListComponent } from './components/entreprise-list/entreprise-list.component';

import { FormateurInscriptionComponent } from './components/formateur-inscription/formateur-inscription.component';
import { FormateurListComponent } from './components/formateur-list/formateur-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatListModule } from '@angular/material/list';
import { RegisterTrainingComponent } from './components/register-training/register-training.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    TrainerDashboardComponent,
    AssistantDashboardComponent,

    TrainingFormComponent,
    TrainingListComponent,

    UserDashboardComponent,
    FormateurComponent,

    EntrepriseFormComponent,
    EntrepriseListComponent,

    FormateurInscriptionComponent,
    FormateurListComponent,

    RegisterTrainingComponent,

    PlanificationComponent,
 
    DateSelectionDialogComponent,
    AccueilComponent,
    PopupComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    MatDialogModule,
    BrowserAnimationsModule,

    MatSelectModule, // Add MatSelectModule here
    FormsModule, // 
    MatButtonModule,
    MatToolbarModule,
    MatIconModule, 
    MatSidenavModule, 
    MatListModule,

    CommonModule,
    MatTableModule,
    MatInputModule,


    MatCardModule,
    MatFormFieldModule,

    MatPaginatorModule,
    MatSortModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
