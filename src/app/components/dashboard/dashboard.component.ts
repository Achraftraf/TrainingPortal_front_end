import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

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

  constructor(
    private service: JwtService
  ) { }

  ngOnInit() {
    this.hello();
  }

  hello() {
    this.service.hello().subscribe(
      (response) => {
        console.log(response);
        this.message = response.message;
      }
    )
  }

}
// =======
// export class DashboardComponent {}
// >>>>>>> merge-test
