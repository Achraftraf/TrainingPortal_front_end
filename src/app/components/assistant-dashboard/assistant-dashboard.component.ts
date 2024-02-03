import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav'; // Correct import

@Component({
  selector: 'app-assistant-dashboard',
  templateUrl: './assistant-dashboard.component.html',
  styleUrls: ['./assistant-dashboard.component.scss']
})
export class AssistantDashboardComponent {
  trainings: any;
  @ViewChild('drawer') drawer: MatDrawer;

  toggleDrawer() {
    console.log('Toggle function called');
    this.drawer.toggle();
  }
}
