// accueil.component.ts
import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
register(arg0: any) {
throw new Error('Method not implemented.');
}
  trainings: any[] = []; // Adjust the type based on your training object structure
  isGoogleFormVisible = false;

  constructor(private jwtService: JwtService) {}

  ngOnInit(): void {
    this.fetchTrainings();
  }

  fetchTrainings(): void {
    this.jwtService.getTrainings().subscribe(
      (trainings) => {
        this.trainings = trainings;
      },
      (error) => {
        console.error('Error fetching trainings:', error);
      }
    );
  }

  openGoogleForm() {
    // Open Google Form in a new window
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfOhB_Kwubf9fz7Er4a0klaLfzR9jLye0goqUg7w4BSATlaJg/viewform?embedded=true', '_blank');
}

}
