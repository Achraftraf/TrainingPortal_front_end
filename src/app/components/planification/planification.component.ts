import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { JwtService } from 'src/app/service/jwt.service';
import { Trainer, Training, TrainingSchedule } from './model';
import { DateClickArg, EventClickArg, EventDragStopArg, EventSourceInput } from 'fullcalendar';
import { MatDialog } from '@angular/material/dialog';
import { DateSelectionDialogComponent } from '../date-selection-dialog/date-selection-dialog.component';
import { forkJoin } from 'rxjs';

export interface MyInterface {
  fetchAdditionalDetails(): void;
}

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.scss'],
})
export class PlanificationComponent implements MyInterface {
  calendarOptions?: CalendarOptions;
  trainers: Trainer[] = [];
  selectedTrainer: Trainer | null = null;
  trainings: Training[] = [];
  selectedTraining: Training | null = null;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;

  constructor(private jwtService: JwtService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadTrainers();
    this.loadTrainings();

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      editable: true,
      events: this.loadTrainingSchedules(),
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this),
      // ... other options
    };
  }

  loadTrainers() {
    this.jwtService.getTrainers().subscribe(
      (data: Trainer[]) => {
        console.log('Trainers:', data);
        this.trainers = data;
      },
      (error) => this.handleError('Error fetching trainers:', error)
    );
  }

  loadTrainings() {
    this.jwtService.getTrainings().subscribe(
      (data: Training[]) => (this.trainings = data),
      (error) => this.handleError('Error fetching trainings:', error)
    );
  }

  loadTrainingSchedules(): EventSourceInput {
    return {
      events: (fetchInfo, successCallback, failureCallback) => {
        this.jwtService.getTrainingSchedules().subscribe(
          (data: TrainingSchedule[]) => {
            const events = data.map((schedule) => ({
              title: schedule.training?.title || 'Untitled Training',
              start: schedule.date,
              id: schedule.id.toString(),
              training: schedule.training,
            }));

            successCallback(events);
          },
          (error) => this.handleError('Error fetching training schedules:', error)
        );
      },
    };
  }

  handleDateClick(arg: DateClickArg) {
    const dialogRef = this.dialog.open(DateSelectionDialogComponent, {
      width: '400px',
      data: { trainers: this.trainers, trainings: this.trainings },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { selectedTrainerId, selectedTrainingTitle } = result;
        this.fetchSelectedTrainerAndTraining(selectedTrainerId, selectedTrainingTitle, arg.dateStr);
      }
    });
  }

  fetchSelectedTrainerAndTraining(selectedTrainerId: string, selectedTrainingTitle: string, selectedDate: string) {
    forkJoin([
      this.jwtService.getTrainerDetails(Number(selectedTrainerId)),
      this.jwtService.getTrainings(),
    ]).subscribe(([selectedTrainer, trainings]) => {
      console.log('Selected Trainer:', selectedTrainer);
      console.log('All Trainings:', trainings);
  
      const selectedTraining = trainings.find((training) => training.title === selectedTrainingTitle);
      console.log('Selected Training:', selectedTraining);
  
      this.scheduleTraining(selectedTrainer, selectedTraining, selectedDate);
    });
  }
  

  fetchAdditionalDetails() {
    // Fetch additional details if needed
    // You can use this.selectedTrainer.id or this.selectedTraining.id to fetch more details
  }

  scheduleTraining(selectedTrainer: Trainer, selectedTraining: Training, selectedDate: string) {
    if (!selectedTrainer || !selectedTraining || !selectedDate) {
      console.error('Trainer, Training, or selected date not available.');
      return;
    }
  
    this.fetchAdditionalDetails();
  
    console.log('Selected Trainer ID:', selectedTrainer.id);
    console.log('Selected Training Title:', selectedTraining.title);
  
    const scheduleRequest = {
      date: selectedDate,
      trainer: { id: selectedTrainer.id },
      enterprise: { id: 1 }, // Replace with the actual enterprise data
      training: { id: selectedTraining.id },
    };
  
    console.log('Schedule Request:', scheduleRequest);
  
    // Log the payload before making the HTTP request
    console.log('HTTP Request Payload:', scheduleRequest);
  
    this.jwtService.scheduleTraining(scheduleRequest).subscribe(
      (response) => {
        console.log('Training scheduled successfully:', response);
        this.updateCalendarEvents();
      },
      (error) => this.handleError('Error scheduling training:', error)
    );
  }
  
  updateCalendarEvents() {
    this.loadTrainingSchedules();
  }

  handleEventClick(arg: EventClickArg) {
    console.log(arg);
    // Optionally, you can update the selected event details here
  }

  handleEventDragStop(arg: EventDragStopArg) {
    console.log(arg);
    // Optionally, you can handle event drag stop here
  }

  private handleError(message: string, error: any) {
    console.error(message, error);
    // Handle error as needed
  }
}