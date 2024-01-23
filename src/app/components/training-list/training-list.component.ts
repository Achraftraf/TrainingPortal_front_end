// training-list.component.ts

import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {

  trainings: any[] = []; // Assuming your training data structure, update accordingly

  constructor(private jwtService: JwtService) { }

  ngOnInit(): void {
    // Fetch the list of trainings from the service upon component initialization
    this.jwtService.getTrainings().subscribe(
      (data: any) => {
        this.trainings = data;
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }
}
