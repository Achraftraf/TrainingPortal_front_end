import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { JwtService } from 'src/app/service/jwt.service';
import { Trainer, Training, TrainingSchedule } from './model'; // Update the path
import { DateClickArg, EventClickArg, EventDragStopArg, EventSourceInput } from 'fullcalendar';
import { EventApi } from '@fullcalendar/core';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DateSelectionDialogComponent } from '../date-selection-dialog/date-selection-dialog.component';

export interface MyInterface {
  fetchAdditionalDetails(): void;
}
@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.scss'],
})




export class PlanificationComponent implements MyInterface  {
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
        console.log(data); // Log the data to see its structure
        this.trainers = data;
      },
      (error) => {
        console.error('Error fetching trainers:', error);
        // Handle error as needed
      }
    );
  }
  

  loadTrainings() {
    this.jwtService.getTrainings().subscribe(
      (data: Training[]) => {
        this.trainings = data;
      },
      (error) => {
        console.error('Error fetching trainings:', error);
        // Handle error as needed
      }
    );
  }

  loadTrainingSchedules(): EventSourceInput {
    const events: EventSourceInput = {
      events: (fetchInfo, successCallback, failureCallback) => {
        this.jwtService.getTrainingSchedules().subscribe(
          (data: TrainingSchedule[]) => {
            const events = data.map((schedule) => ({
              title: schedule.training.title,
              start: schedule.date,
              // Add other necessary properties
              id: schedule.id.toString(),
              training: schedule.training, // Include the training property
            }));
            
            successCallback(events);
          },
          (error) => {
            console.error('Error fetching training schedules:', error);
            failureCallback(error);
          }
        );
      },
    };
    return events;
  }
  handleDateClick(arg: DateClickArg) {
    // Open a modal or form to select trainer and training
    const dialogRef = this.dialog.open(DateSelectionDialogComponent, {
      width: '400px',
      data: { trainers: this.trainers, trainings: this.trainings },
    });

    // After the user closes the modal/form
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // result contains selectedTrainer and selectedTraining
        this.selectedTrainer = result.selectedTrainer;
        this.selectedTraining = result.selectedTraining;

        // Now, you can schedule the training using the selected date and fetched data
        this.scheduleTraining(arg.dateStr);
      }
    });
  }

  fetchDataAndScheduleTraining(selectedDate: string) {

    const trainersObservable = this.jwtService.getTrainers();
    const trainingsObservable = this.jwtService.getTrainings();

    // Combine the observables and wait for all requests to complete
    forkJoin([trainersObservable, trainingsObservable]).subscribe(
      ([trainersData, trainingsData]) => {
        // Assuming you have fetched trainers and trainings successfully
        this.trainers = trainersData;
        this.trainings = trainingsData;

        // Optionally, you can display the fetched data or perform other actions

        // Now, you can schedule the training using the selected date and fetched data
        this.scheduleTraining(selectedDate);
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Handle error as needed
      }
    );
  }

  scheduleTraining(selectedDate: string) {
    // Check if the required data is available
    if (!this.selectedTrainer || !this.selectedTraining || !selectedDate) {
      console.error('Trainer, Training, or selected date not available.');
      return;
    }
  
    // Fetch additional details about the selected trainer and training if needed
    this.fetchAdditionalDetails();
  
    const scheduleRequest = {
      date: selectedDate,
      // trainer: { id: this.selectedTrainer.id},
      trainer: { id: 1},
      enterprise: { id: 1 }, // Replace with the actual enterprise data
      // training: { id: this.selectedTraining.id},
      training: { id: 1},
    };
  
    this.jwtService.scheduleTraining(scheduleRequest).subscribe(
      (response) => {
        console.log('Training scheduled successfully:', response);
        // Update the calendar events after successful scheduling
        this.updateCalendarEvents();
      },
      (error) => {
        console.error('Error scheduling training:', error);
        // Handle error as needed
      }
    );
  }
  fetchAdditionalDetails() {
    // Implementation of the method
    console.log('Fetching additional details...');
  }


  updateCalendarEvents() {
    this.loadTrainingSchedules(); // Refresh the calendar events after scheduling
  }

  handleEventClick(arg: EventClickArg) {
    console.log(arg);
    // Optionally, you can update the selected event details here
  }

  handleEventDragStop(arg: EventDragStopArg) {
    console.log(arg);
    // Optionally, you can handle event drag stop here
  }
}
