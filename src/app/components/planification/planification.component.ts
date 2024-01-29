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

    this.loadTrainingSchedules().then(events => {
      this.calendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        editable: true,
        events: events,
        dateClick: this.handleDateClick.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventDragStop: this.handleEventDragStop.bind(this),
        // ... other options
      };
    });
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

  async loadTrainingSchedules(): Promise<EventSourceInput> {
    return new Promise((resolve, reject) => {
      this.jwtService.getTrainingSchedules().subscribe(
        (data: TrainingSchedule[]) => {
          const events = data.map((schedule) => {
            const id = schedule.id?.toString() || '';
            const trainerName = schedule.trainer?.name || 'Unknown Trainer';
            const trainingTitle = schedule.training?.title || 'Untitled Training';
  
            return {
              title: `${trainingTitle} with ${trainerName}`, // Combine training and trainer names
              start: schedule.date,
              id: id,
              training: schedule.training,
              trainer: schedule.trainer,
            };
          });
  
          resolve(events);
        },
        (error) => {
          this.handleError('Error fetching training schedules:', error);
          reject(error);
        }
      );
    });
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
  
  async updateCalendarEvents() {
    try {
      const events = await this.loadTrainingSchedules();
      if (this.fullcalendar) {
        this.fullcalendar.getApi().removeAllEvents(); // Clear existing events
        this.fullcalendar.getApi().addEventSource(events); // Add new events
      }
      console.log('Calendar events updated successfully:', events);
    } catch (error) {
      // Handle error as needed
      console.error('Error updating calendar events:', error);
    }
  }
  handleEventClick(arg: EventClickArg) {
    console.log(arg);
    // Your implementation here
  }
  handleEventDragStop(arg: EventDragStopArg) {
    const { event } = arg;
    const { id, start } = event;
    
    // Update the date in the backend
    this.updateEventDate(id, start.toISOString());
  
    // Refresh the calendar events
    this.updateCalendarEvents();
  }
  updateEventDate(eventId: string, newDate: string) {
    // Format the date as needed by your backend
    const formattedDate = new Date(newDate).toISOString();
  
    // Call your service to update the event date in the backend
    this.jwtService.updateTrainingScheduleDate(eventId, formattedDate).subscribe(
      (response) => {
        console.log('Training schedule date updated successfully:', response);
      },
      (error) => this.handleError('Error updating training schedule date:', error)
    );
  }
  
  private handleError(message: string, error: any) {
    console.error(message, error);
    // Handle error as needed
  }
}