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
      this.trainingId = Number(params['id']); // Extract training ID from route
      this.initForm();
    });
  }

  initForm(): void {
    if (this.trainingId) {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateOfBirth: ['', [Validators.required, this.dateValidator]],
        city: [''],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
      });
    } else {
      console.error('Invalid training ID');
    }
  }

  dateValidator(control) {
    // Custom date format validation
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(control.value);
    return isValidDate ? null : { invalidDate: true };
  }

  submitForm(): void {
    if (this.registerForm && this.trainingId) {
      const participantData = this.registerForm.value;
      participantData.trainingId = this.trainingId;

      this.jwtService.registerForTraining(this.trainingId, participantData).subscribe(
        (response) => {
          console.log(response);
          alert("Successfully registered for training");
        },
        (error) => {
          console.error('Error registering for training:', error);
        
        }
      );
    } else {
      console.error('registerForm or trainingId is undefined');
    }
  }
}
