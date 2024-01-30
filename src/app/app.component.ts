import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'jwt-angular';
  userRoles: string[] = [];

  constructor(private jwtService: JwtService) {}

  ngOnInit() {
    // Get roles from the token
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      this.userRoles = this.jwtService.getRolesFromToken(jwtToken);
    }
  }
}
