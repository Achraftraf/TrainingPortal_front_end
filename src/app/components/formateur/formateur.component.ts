// formateur.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.scss']
})
export class FormateurComponent implements OnInit {

  formateurForm: FormGroup | undefined;

  constructor(private jwtService: JwtService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formateurForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      // Add other fields as needed
    });
  }

  submitFormateurForm() {
    if (this.formateurForm?.valid) {
      const formateurRequest = this.formateurForm.value;

      this.jwtService.addFormateur(formateurRequest).subscribe(
        response => {
          console.log(response);
          // Handle success response

          // After successfully adding the formateur, navigate to the dashboard or another route
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
