// services/appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment'; 
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:6001/appointment';

  constructor(private http: HttpClient) {}
// In Angular, the Observable class is used to represent a stream of data over time. 
//When you make an HTTP request using Angular's HttpClient, the response is often wrapped in an Observable 
//to provide an asynchronous and reactive way to handle the data.
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/list`);
  }
  saveAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<any>(`${this.apiUrl}/save`, appointment).pipe(
      map(response => {
        console.log('Full response:', response); // Log the entire response for inspection
        return response.appointment; // Adjust this based on your actual response structure
      }),
      catchError(error => {
        console.error('Error saving appointment:', error);
        throw error;
      })
    );
  }
}