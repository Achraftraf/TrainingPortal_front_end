// entreprise-list.component.ts

import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.scss']
})
export class EntrepriseListComponent implements OnInit {

  entreprises: any[] = []; // Assuming your entreprise object structure, adjust as needed

  constructor(private jwtService: JwtService) { }

  ngOnInit(): void {
    this.loadEntreprises();
  }

  loadEntreprises() {
    this.jwtService.getEntreprises().subscribe(
      response => {
        this.entreprises = response;
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }
}
