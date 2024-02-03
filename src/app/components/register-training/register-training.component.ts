// register-training.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-register-training',
  templateUrl: './register-training.component.html',
  styleUrls: ['./register-training.component.scss']
})
export class RegisterTrainingComponent implements OnInit {
  registerForm: FormGroup;
  trainingId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.trainingId = Number(params['idtraining']); // Extract training ID from route
      this.initForm();
    });
  }

  initForm(): void {
    if (this.trainingId) {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        city: [''],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
      });
    } else {
      console.error('Invalid training ID');
    }
  }

  submitForm(): void {
    if (this.registerForm) {
      const participantData = this.registerForm.value;
      participantData.trainingId = this.trainingId;

      this.jwtService.registerForTraining(this.trainingId, participantData).subscribe(
        (response) => {
          console.log(response);
          alert("Successfully registered for training");
        },
        (error) => {
          console.error('Error registering for training:', error);
          alert("Failed to register for training");
        }
      );
    } else {
      console.error('registerForm is undefined');
    }
  }
}
