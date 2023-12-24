import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service'; // Adjust the path based on your directory structure
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default // or ChangeDetectionStrategy.OnPush
})
export class AppointmentListComponent {

  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = [];
  appointments$: Observable<Appointment[]> = this.appointmentService.appointments$; // Initialize here
      
   
    // inject appointment service 
    constructor(
      private appointmentService: AppointmentService
    ) {}
    


  ngOnInit() {
    // Fetch initial appointments when the component initializes
    // this.fetchAppointments();
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
      const newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
      };
  
      this.appointmentService.saveAppointment(newAppointment).subscribe(
        (savedAppointment: Appointment) => {
          console.log('Appointment saved successfully:', savedAppointment);
  
          // Optionally, update local state (if needed)
          this.appointments.push(savedAppointment);
  
          // Fetch appointments again to update the list
          this.fetchAppointments();
        },
        (error) => {
          console.error('Error saving appointment:', error);
        }
      );
    }
  }
  
  // addAppointment() {
  //   if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
  //     const newAppointment: Appointment = {
  //       id: Date.now(),
  //       title: this.newAppointmentTitle,
  //       date: this.newAppointmentDate
  //     };
  
  //     this.appointmentService.saveAppointment(newAppointment).subscribe(
  //       (savedAppointment: Appointment) => {
  //         console.log('Appointment saved successfully:', savedAppointment);
          
  //         // Update local state
  //         this.appointments.push(savedAppointment);
  
  //         // Update observable by creating a new observable with the updated data
  //         this.appointments$ = this.appointmentService.appointments$;
  //       },
  //       (error) => {
  //         console.error('Error saving appointment:', error);
  //       }
  //     );
  //   }
  // }
  
  // Important!!! using single quotes (') around the log messages, which causes the ${id} part not to be interpolated. 
  // In JavaScript and TypeScript, string interpolation is done with backticks (``) instead of single or double quotes.
  onDeleteAppointment(id: number): void {
    this.appointmentService.deleteAppointment(id).subscribe(
      (response) => {
      // const message=response['message'] is a map
        console.log(response['message']);  // Access the message property in the response
        // Add any additional logic you need for a successful delete
        window.alert(response['message']);
            // Update local state if needed
    this.appointments = this.appointments.filter(appointment => appointment.id !== id);

      },
      (error) => {
        console.error(`Error deleting appointment with ID ${id}`, error);
        // Handle error as needed
      }
    );
  }
     
}