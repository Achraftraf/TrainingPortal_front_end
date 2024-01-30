import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Trainer, Training } from '../planification/model';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-date-selection-dialog',
  templateUrl: './date-selection-dialog.component.html',
  styleUrls: ['./date-selection-dialog.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(300)),
    ]),
  ]
})
export class DateSelectionDialogComponent {
  selectedTrainerId: number | null = null;
  selectedTrainingTitle: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<DateSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; trainers: Trainer[]; trainings: Training[] }
  ) {}

  save() {
    console.log('Selected Trainer ID:', this.selectedTrainerId);
    console.log('Selected Training Title:', this.selectedTrainingTitle);
    this.dialogRef.close({ selectedTrainerId: this.selectedTrainerId, selectedTrainingTitle: this.selectedTrainingTitle });
    window.location.reload();
  }
  
  close() {
    this.dialogRef.close();
  }
}
