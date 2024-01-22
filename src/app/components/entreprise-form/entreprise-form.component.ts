import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-entreprise-form',
  templateUrl: './entreprise-form.component.html',
  styleUrls: ['./entreprise-form.component.scss']
})
export class EntrepriseFormComponent implements OnInit {

  entrepriseForm: FormGroup | undefined;

  constructor(private jwtService: JwtService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.entrepriseForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      url: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  submitEntrepriseForm() {
    if (this.entrepriseForm?.valid) {
      const entrepriseRequest = this.entrepriseForm.value;

      this.jwtService.Entreprise_add(entrepriseRequest).subscribe(
        response => {
          console.log(response);
          // Handle success response

          // After successfully adding the entreprise, navigate to the dashboard or another page
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
