// participants.component.ts
import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  participants: any[] = [];

  constructor(private jwtService: JwtService) { }

  ngOnInit(): void {
    this.loadParticipants();
  }

  loadParticipants() {
    this.jwtService.getParticipants().subscribe(
      response => {
        this.participants = response;
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }
  
}
