import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | undefined;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

 submitForm() {
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        if (response.jwt != null) {
          const jwtToken = response.jwt;
          localStorage.setItem('jwt', jwtToken);

          // Extract roles from the JWT token
          const roles = this.service.getRolesFromToken(jwtToken);
          console.log(roles)

          // Redirect based on roles
          if (roles.includes('ROLE_ADMIN')) {
            this.router.navigateByUrl("/dashboard");
          } else if (roles.includes('ROLE_USER')) {
            this.router.navigateByUrl("/user-dashboard");

          } else {
            // Default redirect if role not recognized
            console.warn("Unknown role. Unable to determine the dashboard.");
          }
        }
      }
    );
  }
}