import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.scss'],
})
export class TrainerDashboardComponent {
  @ViewChild('drawer') drawer: MatDrawer;
  message: string;
  trainings: any;

  constructor(private service: JwtService) {}

  ngOnInit() {
    this.hello();
    this.fetchTrainings();
  }

  hello() {
    this.service.hello().subscribe(
      (response) => {
        console.log(response);
        this.message = response.message;
      }
    );
  }

  fetchTrainings(): void {
    this.service.getTrainings().subscribe(
      (trainings) => {
        this.trainings = trainings;
      },
      (error) => {
        console.error('Error fetching trainings:', error);
      }
    );
  }

  toggleDrawer() {
    console.log('Toggle function called');
    this.drawer.toggle();
  }
}
