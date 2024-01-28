// formateur-list.component.ts

import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-formateur-list',
  templateUrl: './formateur-list.component.html',
  styleUrls: ['./formateur-list.component.scss']
})
export class FormateurListComponent implements OnInit {
  formateurs: any[] = [];

  constructor(private jwtService: JwtService) { }

  ngOnInit(): void {
    this.loadFormateurs();
  }

  loadFormateurs(): void {
    this.jwtService.getFormateurs().subscribe(
      response => {
        this.formateurs = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  acceptFormateur(formateurId: number) {
    this.jwtService.acceptFormateur(formateurId).subscribe(
      response => {
        console.log('Accepting Formateur:', formateurId);
        console.log('Formateur accepted:', response);
        this.loadFormateurs(); // Reload the formateurs list after accepting
      },
      error => {
        console.error('Error accepting formateur:', error);
      }
    );
  }

  rejectFormateur(formateurId: number) {
    this.jwtService.rejectFormateur(formateurId).subscribe(
      response => {
        console.log('Rejecting Formateur:', formateurId);
        console.log('Formateur rejected:', response);
        this.loadFormateurs(); // Reload the formateurs list after rejecting
      },
      error => {
        console.error('Error rejecting formateur:', error);
      }
    );
  }
}
