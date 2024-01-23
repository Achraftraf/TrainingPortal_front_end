import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {

  trainings: any[] = [];
  filterCategory: string = '';
  filterCity: string = '';
  filterDate: string = '';

  constructor(private jwtService: JwtService) { }

  ngOnInit(): void {
    this.fetchTrainings();
  }

  fetchTrainings() {
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

  filterTrainings() {
    // Call the service method with filter criteria
    this.jwtService.getFilteredTrainings(this.filterCategory, this.filterCity, this.filterDate).subscribe(
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
