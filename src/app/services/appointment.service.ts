// services/appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { Appointment } from '../models/appointment'; 
// import { map, catchError } from 'rxjs/operators';
// import { tap, catchError } from 'rxjs/operators';
import { map,catchError } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:6001/appointment';

  // Use BehaviorSubject to store and notify subscribers about changes to the appointments list
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
  appointments$: Observable<Appointment[]> = this.appointmentsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Fetch appointments and notify subscribers
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/list`).pipe(
      tap((appointments) => {
        this.appointmentsSubject.next(appointments);
      })
    );
  }


  saveAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<any>(`${this.apiUrl}/save`, appointment).pipe(
      map((response) => {
        console.log('Full response:', response);
  
        // Check if response.appointment is truthy before accessing its properties
        const savedAppointment = response.appointment ? response.appointment : null;
  
        if (savedAppointment) {
          const currentAppointments = this.appointmentsSubject.value;
          const updatedAppointments = [...currentAppointments, savedAppointment];
          this.appointmentsSubject.next(updatedAppointments);
        }
  
        return savedAppointment;
      }),
      catchError((error) => {
        console.error('Error saving appointment:', error);
        throw error;
      })
    );
  }
  
  // Delete appointment, update the list, and notify subscribers
  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`).pipe(
      tap(() => {
        const currentAppointments = this.appointmentsSubject.value;
        const updatedAppointments = currentAppointments.filter((appointment) => appointment.id !== id);
        this.appointmentsSubject.next(updatedAppointments);
      })
    );
  }
}

// @Injectable({
//   providedIn: 'root'
// })
// export class AppointmentService {
//   private apiUrl = 'http://localhost:6001/appointment';

//   constructor(private http: HttpClient) {}
// // In Angular, the Observable class is used to represent a stream of data over time. 
// //When you make an HTTP request using Angular's HttpClient, the response is often wrapped in an Observable 
// //to provide an asynchronous and reactive way to handle the data.
//   getAppointments(): Observable<Appointment[]> {
//     return this.http.get<Appointment[]>(`${this.apiUrl}/list`);
//   }
//   saveAppointment(appointment: Appointment): Observable<Appointment> {
//     return this.http.post<any>(`${this.apiUrl}/save`, appointment).pipe(
//       map(response => {
//         console.log('Full response:', response); // Log the entire response for inspection
//         return response.appointment; // Adjust this based on your actual response structure
//       }),
//       catchError(error => {
//         console.error('Error saving appointment:', error);
//         throw error;
//       })
//     );
//   }
//   // delete function returns a success message
//   // interpolate ${id} in ticks with curly braces!!
//   deleteAppointment(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/delete/${id}`);
//   }
  
  
// }

  // Save appointment, update the list, and notify subscribers
  // saveAppointment(appointment: Appointment): Observable<Appointment> {
  //   return this.http.post<any>(`${this.apiUrl}/save`, appointment).pipe(
  //     map((response) => {
  //       console.log('Full response:', response); // Log the entire response for inspection
  //       const savedAppointment = response.appointment; // Adjust this based on your actual response structure
  //       const currentAppointments = this.appointmentsSubject.value;
  //       const updatedAppointments = [...currentAppointments, savedAppointment];
  //       this.appointmentsSubject.next(updatedAppointments);
  //       return savedAppointment;
  //     }),
  //     catchError((error) => {
  //       console.error('Error saving appointment:', error);
  //       throw error;
  //     })
  //   );
  // }
  // saveAppointment(appointment: Appointment): Observable<Appointment> {
  //   return this.http.post<any>(`${this.apiUrl}/save`, appointment).pipe(
  //     map((response) => {
  //       const savedAppointment = response.appointment;
  //       const currentAppointments = this.appointmentsSubject.value;
  //       const updatedAppointments = [...currentAppointments, savedAppointment];
  //       this.appointmentsSubject.next(updatedAppointments);
  //       return savedAppointment;
  //     }),
  //     catchError((error) => {
  //       console.error('Error saving appointment:', error);
  //       // Rethrow the error to propagate it to the subscriber
  //       throw error;
  //     })
  //   );
  // }