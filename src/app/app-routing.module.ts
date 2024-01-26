// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrainingFormComponent } from './components/training-form/training-form.component';
import { EntrepriseFormComponent } from './components/entreprise-form/entreprise-form.component';
import { EntrepriseListComponent } from './components/entreprise-list/entreprise-list.component';
import { FormateurInscriptionComponent } from './components/formateur-inscription/formateur-inscription.component';
import { FormateurListComponent } from './components/formateur-list/formateur-list.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'training', component: TrainingFormComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'training-form', component: TrainingFormComponent },
  { path: 'entreprise-form', component: EntrepriseFormComponent },
  { path: 'entreprise-list', component: EntrepriseListComponent },
  { path: 'formateur-inscription', component: FormateurInscriptionComponent },
  { path: 'formateur-list', component: FormateurListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
