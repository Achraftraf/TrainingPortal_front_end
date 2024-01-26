// formateur-inscription.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';


@Component({
  selector: 'app-formateur-inscription',
  templateUrl: './formateur-inscription.component.html',
  styleUrls: ['./formateur-inscription.component.scss']
})
export class FormateurInscriptionComponent implements OnInit {

  formateurForm: FormGroup | undefined;

  constructor(private JwtService: JwtService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formateurForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      skils: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMathValidator });
  }

  passwordMathValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password != confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  inscrireFormateur() {
    if (this.formateurForm.valid) {
      const formateurRequest = this.formateurForm.value;
      this.JwtService.inscrireFormateur(formateurRequest).subscribe(
        response => {
          console.log('Response:', response);
          // Handle success response
          this.router.navigateByUrl('/dashboard');
        },
        error => {
          console.error('Error:', error);
          // Handle error
        }
      );
    }
  }

}