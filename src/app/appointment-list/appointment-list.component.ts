import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service'; // Adjust the path based on your directory structure
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {

    newAppointmentTitle: string= "";
    newAppointmentDate:Date=new Date();
    appointments: Appointment[]=[];
      
   
    // inject appointment service 
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    // Fetch initial appointments when the component initializes
    this.fetchAppointments();
  }
  public fetchAppointments() {
    console.log('Fetching appointments...');
    // Fetch the list of appointments using the service
    this.appointmentService.getAppointments().subscribe(
      (appointments) => {
        console.log('Appointments received:', appointments);
        // Successfully fetched, update the local array
        this.appointments = appointments;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      };
  
      this.appointmentService.saveAppointment(newAppointment).subscribe(
        (savedAppointment: Appointment) => {
          // Optionally, you can update the UI or perform other actions
          console.log('Appointment saved successfully:', savedAppointment);
  
          // Clear the form or update the local data if needed
          // this.appointments.push(savedAppointment);
        },
        (error) => {
          console.error('Error saving appointment:', error);
        }
      );
    }
  }
  
   // addAppointment(){
    //   if(this.newAppointmentTitle.trim().length&& this.newAppointmentDate){
    //     let newAppointment: Appointment={
    //       id:Date.now(),
    //       title: this.newAppointmentTitle,
    //       date: this.newAppointmentDate
    //     }
    //     // push adds the newAppointment to the appointments array
    //     this.appointments.push(newAppointment)
    //   }
      
    //   // alert(this.newAppointmentTitle+" "+this.newAppointmentDate)
    //   // this.appointments
    // }
      // it is property since it is defined inside a class
  // when it is defined inside a function/method it is a variable

  // Apointment interface is implemented by appointment object no need for a concrete class 
  // appointment: Appointment ={
  //   id: 1,
  //   title: "Take dog for a walk",
  //   date: new Date('2023-12-22')
  // }
     
}
