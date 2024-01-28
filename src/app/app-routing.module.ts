// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrainingFormComponent } from './components/training-form/training-form.component';

import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FormateurComponent } from './components/formateur/formateur.component';

import { EntrepriseFormComponent } from './components/entreprise-form/entreprise-form.component';
import { EntrepriseListComponent } from './components/entreprise-list/entreprise-list.component';
import { TrainingListComponent } from './components/training-list/training-list.component';
import { PlanificationComponent } from './components/planification/planification.component';
import { AccueilComponent } from './components/accueil/accueil.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'training', component: TrainingFormComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'formateur', component: FormateurComponent },
  { path: 'training-form', component: TrainingFormComponent },
  { path: 'training-list', component: TrainingListComponent, },

  { path: '', redirectTo: '/accueil', pathMatch: 'full' },

  { path: 'entreprise-form', component: EntrepriseFormComponent },
  { path: 'entreprise-list', component: EntrepriseListComponent },
  { path: 'planificationt', component: PlanificationComponent },  
  { path: 'accueil', component: AccueilComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
