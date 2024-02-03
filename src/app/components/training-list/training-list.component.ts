// training-list.component.ts

import { HttpClient } from "@angular/common/http";
import { Training } from "../planification/model";
import { Component, OnInit } from "@angular/core";
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-training',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {
  trainings: Training[];
  filteredTrainings: Training[];
  category: string;
  city: string;
  date: string;

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.fetchTrainings();
  }

  fetchTrainings(): void {
    this.jwtService.getTrainings().subscribe(
      (trainings) => {
        this.trainings = trainings;
        // Initially, set filteredTrainings to all trainings
        this.filteredTrainings = trainings;
      },
      (error) => {
        console.error('Error fetching trainings:', error);
      }
    );
  }

  filterTrainings(): void {
    // Implement your filter logic here...
    // Update this.filteredTrainings based on category, city, and date

    this.filteredTrainings = this.trainings.filter(training => {
      const categoryMatch = !this.category || training.category.toLowerCase().includes(this.category.toLowerCase());
      const cityMatch = !this.city || training.city.toLowerCase().includes(this.city.toLowerCase());
      const dateMatch = !this.date || this.matchTrainingDate(training, this.date);

      // Combine all filter conditions
      return categoryMatch && cityMatch && dateMatch;
    });
  }

  matchTrainingDate(training: Training, selectedDate: string): boolean {
    // Implement your logic for matching training date with selectedDate
    // For example, if training has a schedule and schedule.date matches selectedDate
    return training.schedule && training.schedule.date === selectedDate;
  }
}
