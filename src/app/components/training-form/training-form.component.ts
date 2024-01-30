// training-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss']
})
export class TrainingFormComponent implements OnInit {

  trainingForm: FormGroup | undefined;

  constructor(private jwtService: JwtService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.trainingForm = this.fb.group({
      title: ['', Validators.required],
      hours: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      cost: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      objectives: ['', Validators.required],
      detailedProgram: ['', Validators.required],
      category: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  submitTrainingForm() {
    if (this.trainingForm?.valid) {
      const trainingRequest = this.trainingForm.value;

      this.jwtService.trainings_add(trainingRequest).subscribe(
        response => {
          console.log(response);
          // Handle success response

          // After successfully adding the training, navigate to the dashboard
          this.router.navigateByUrl('/dashboard');
        },
        error => {
          console.error(error);
          // Handle error
        }
      );
    }
  }
}
