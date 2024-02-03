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

import { FormateurInscriptionComponent } from './components/formateur-inscription/formateur-inscription.component';
import { FormateurListComponent } from './components/formateur-list/formateur-list.component';

import { TrainingListComponent } from './components/training-list/training-list.component';
import { PlanificationComponent } from './components/planification/planification.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { TrainerDashboardComponent } from './components/trainer-dashboard/trainer-dashboard.component';
import { AssistantDashboardComponent } from './components/assistant-dashboard/assistant-dashboard.component';
import { RegisterTrainingComponent } from './components/register-training/register-training.component';
import { ParticipantsComponent } from './components/participants/participants.component';



const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'trainer-dashboard', component: TrainerDashboardComponent },
  { path: 'assistant-dashboard', component: AssistantDashboardComponent },
  // { path: 'training', component: TrainingFormComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'formateur', component: FormateurComponent },
  { path: 'training-form', component: TrainingFormComponent },
  { path: 'training-list', component: TrainingListComponent, },

  { path: '', redirectTo: '/register', pathMatch: 'full' },

  { path: 'entreprise-form', component: EntrepriseFormComponent },
  { path: 'entreprise-list', component: EntrepriseListComponent },

  { path: 'formateur-inscription', component: FormateurInscriptionComponent },
  { path: 'formateur-list', component: FormateurListComponent },
  { path: 'participant-list', component: ParticipantsComponent },

  { path: 'planificationt', component: PlanificationComponent },  
  { path: 'accueil', component: AccueilComponent },
  // { path: 'api/register-training/:id', component: RegisterTrainingComponent },


  { path: '', component: AccueilComponent },
  { path: 'register-training/:id', component: RegisterTrainingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
