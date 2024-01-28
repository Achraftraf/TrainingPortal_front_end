import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Trainer, Training } from '../planification/model';

@Component({
  selector: 'app-date-selection-dialog',
  template: `
    <h2>Select Trainer and Training</h2>
    <div>
      <label for="trainer">Trainer:</label>
      <select [(ngModel)]="selectedTrainerId" name="trainer">
        <option *ngFor="let trainer of data.trainers" [value]="trainer.id">{{ trainer.name }}</option>
      </select>
    </div>
    <div>
      <label for="training">Training:</label>
      <select [(ngModel)]="selectedTrainingTitle" name="training">
        <option *ngFor="let training of data.trainings" [value]="training.title">{{ training.title }}</option>
      </select>
    </div>
    <div>
      <button mat-raised-button color="primary" (click)="save()">Save</button>
      <button mat-raised-button (click)="close()">Cancel</button>
    </div>
  `,
})
export class DateSelectionDialogComponent {
  selectedTrainerId: number | null = null;
  selectedTrainingTitle: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<DateSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { trainers: Trainer[]; trainings: Training[] }
  ) {}

  save() {
    // Log the selectedTrainerId and selectedTrainingTitle
    console.log('Selected Trainer ID:', this.selectedTrainerId);
    console.log('Selected Training Title:', this.selectedTrainingTitle);
  
    // Emit selected trainer and training when Save button is clicked
    this.dialogRef.close({ selectedTrainerId: this.selectedTrainerId, selectedTrainingTitle: this.selectedTrainingTitle });
  }
  
  close() {
    // Close the dialog without emitting any value
    this.dialogRef.close();
  }
}
