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
}
