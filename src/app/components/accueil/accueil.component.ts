// accueil.component.ts

import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  trainings: any[] = [];

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  register(training: any): void {
    console.log('Training Object:', training);
  
    // Check if participants array is defined
    if (training && training.participants && Array.isArray(training.participants)) {
      // Filter out participants without a valid id
      const validParticipants = training.participants.filter(participant => participant && participant.id);
      if (training.id && (validParticipants.length > 0 || training.participants.length === 0)) {
        // Pass the training ID when navigating to the registration form
        this.router.navigate(['/register-training', training.id]);
    } else {
        console.error('Invalid training object or training id is undefined');
    }
    } else {
      console.error('Invalid training object or participants array is undefined');
      console.log('Full training object:', training);
    }
  }
  
  
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


  goToTrainingList(): void {
    // Navigate to the training list component
    this.router.navigate(['/training-list']);
  }

  openGoogleForm() {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfOhB_Kwubf9fz7Er4a0klaLfzR9jLye0goqUg7w4BSATlaJg/viewform?embedded=true', '_blank');
  }
}