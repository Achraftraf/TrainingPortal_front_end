// participants.component.ts
import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';
import { Trainer } from '../planification/model';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  participants: any[] = [];
  trainers: Trainer[] = [];
  selectedTrainer: { id: number, name: string } = { id: 0, name: '' };

  constructor(private jwtService: JwtService) { }

  ngOnInit(): void {
    this.loadParticipants();
    this.loadTrainers();
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

  loadTrainers() {
    this.jwtService.getTrainers().subscribe(
      response => {
        this.trainers = response;
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }

  associateFormateur(trainingId: number, formateurId: number, participantId: number) {
    console.log('Before subscribe block');
  
    this.jwtService.associateFormateur(trainingId, formateurId, participantId).subscribe(
      response => {
        console.log('Formateur associated successfully');
  
        // Extract participant ID from the server response
        const associatedParticipantId = response.participantId;
  
        // Find the participant in the array
        const participantIndex = this.participants.findIndex(participant => participant.participant.id === participantId);
        console.log('Participant Index:', participantIndex);
  
        if (participantIndex !== -1) {
          // Update the associatedFormateur property for the participant
          const associatedFormateurName = this.selectedTrainer ? this.selectedTrainer.name : 'N/A';
          const associatedFormateur = { id: formateurId, name: associatedFormateurName };
  
          this.participants[participantIndex].associatedFormateur = associatedFormateur;
          this.participants[participantIndex].associatedFormateurId = associatedParticipantId; // Add associatedFormateurId property
          console.log('Participant:', this.participants[participantIndex]);
        }
  
        // Code dependent on participantIndex goes here
        console.log('After subscribe block - Participant Index:', participantIndex);
      },
      error => {
        console.error('Error in HTTP request:', error);
  
        // Handle error
        if (error instanceof ErrorEvent) {
          console.error('Client-side error occurred:', error.error.message);
        } else {
          console.error('Server-side error occurred:', error.error);
        }
  
        // Additional code you want to execute in case of an error
      }
    );
  }
}
