import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {
  // it is property since it is defined inside a class
  // when it is defined inside a function/method it is a variable
  appointment: Appointment ={
    id: 1,
    title: "Take dog for a walk",
    date: new Date('2023-12-22')
  }

}
