//
//   import { Component } from '@angular/core';
//   import { trigger, state, style, animate, transition } from '@angular/animations';

//   @Component({
//     selector: 'app-dashboard',
//     templateUrl: './dashboard.component.html',
//     styleUrls: ['./dashboard.component.scss'],
//     animations: [
//       trigger('fadeInOut', [
//         state('void', style({
//           opacity: 0
//         })),
//         transition('void <=> *', animate(300)),
//       ]),
//     ],
//   })

//   // export class DashboardComponent {


//   //   message: string;

//   //   constructor(
//   //     private service: JwtService
//   //   ) { }

//   //   ngOnInit() {
//   //     this.hello();
//   //   }

//   //   hello() {
//   //     this.service.hello().subscribe(
//   //       (response) => {
//   //         console.log(response);
//   //         this.message = response.message;
//   //       }
//   //     )
//   //   }

//   // }

//   export class DashboardComponent {}

import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})

export class DashboardComponent {

  message: string;
  trainings: any;

  constructor(
    private service: JwtService
  ) { }

  ngOnInit() {
    this.hello();
    this.fetchTrainings();
  }

  hello() {
    this.service.hello().subscribe(
      (response) => {
        console.log(response);
        this.message = response.message;
      }
    )
  }

  fetchTrainings(): void {
    this.service.getTrainings().subscribe(
      (trainings) => {
        this.trainings = trainings;
      },
      (error) => {
        console.error('Error fetching trainings:', error);
      }
    );
  }
}



