import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Trainer, Training, TrainingSchedule } from '../components/planification/model';

const BASE_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  getTrainerDetails(trainerId: number): Observable<Trainer> {
    return this.http.get<Trainer>(`${BASE_URL}formateurs/${trainerId}`, {
      headers: this.createAuhtorizationHeader()
    });
  }

  getTrainingDetails(trainingId: number): Observable<Training> {
    return this.http.get<Training>(`${BASE_URL}api/trainings/${trainingId}`, {
      headers: this.createAuhtorizationHeader()
    });
  }  
  getTrainingSchedules(): Observable<TrainingSchedule[]> {
    return this.http.get<TrainingSchedule[]>(BASE_URL + 'api/training-schedules/all', {
      headers: this.createAuhtorizationHeader()
    });
  }



  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(BASE_URL + 'formateurs', {});
  }
  
  getTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(BASE_URL + 'api/trainingsforall/all', {
      headers: this.createAuhtorizationHeader()
    });
  }


  constructor(private http: HttpClient) { }

  getRolesFromToken(jwtToken: string): string[] {
    const decodedToken = this.decodeToken(jwtToken);
    if (decodedToken && decodedToken.roles) {
      return decodedToken.roles;
    } else {
      return [];
    }
  }
  private decodeToken(jwtToken: string): any {
    try {
      const base64Url = jwtToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(base64));
      return decoded;
    } catch (error) {
      console.error('Error decoding JWT token', error);
      return null;
    }
  }

  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signup', signRequest)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest)
  }

  hello(): Observable<any> {
    return this.http.get(BASE_URL + 'api/hello', {
      headers: this.createAuhtorizationHeader()
    })
  }

  trainings_add(trainingRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/trainings/add', trainingRequest, {
      headers: this.createAuhtorizationHeader()
    });
  }

  Entreprise_add(entrepriseRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/admin/entreprises/add', entrepriseRequest, {
      headers: this.createAuhtorizationHeader()
    });
  }

  getEntreprises(): Observable<any> {
    return this.http.get(BASE_URL + 'api/admin/entreprises/all', {
      headers: this.createAuhtorizationHeader()
    });
  }


  getFormateurs(): Observable<any> {
    return this.http.get(BASE_URL + 'api/fuser/all', {
      headers: this.createAuhtorizationHeader()
    });
  }

  inscrireFormateur(formateurRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'inscrire', formateurRequest);
  }

  acceptFormateur(formateurId: number): Observable<any> {
    return this.http.put(BASE_URL + `api/fuser/accepter/${formateurId}`, null, {
      headers: this.createAuhtorizationHeader()
    });
  }

  rejectFormateur(formateurId: number): Observable<any> {
    return this.http.delete(BASE_URL + `api/fuser/refuser/${formateurId}`, {
      headers: this.createAuhtorizationHeader()
    });
  }
  

//   private createAuthorizationHeader(): HttpHeaders {



getFilteredTrainings(category: string, city: string, date: string): Observable<Training[]> {
  const params = new HttpParams()
      .set('category', category || '')
      .set('city', city || '')
      .set('date', date || '');

  return this.http.get<Training[]>(BASE_URL + 'api/trainings/filtered', {
      headers: this.createAuhtorizationHeader(),
      params: params,
  });
}



  addFormateur(formateurRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'admin/trainer', formateurRequest, {
      headers: this.createAuhtorizationHeader()
    });
  }

  private createAuhtorizationHeader() {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      // return new HttpHeaders().set("Authorization", "Bearer " + jwtToken);
      const headers = new HttpHeaders().set("Authorization", "Bearer " + jwtToken);
      console.log('Request Headers:', headers);
  
      return headers;
    } else {
      console.log("JWT token not found in local storage");
    }
    return null;
  }
  


  logDecodedToken() {
    const jwtToken = localStorage.getItem('jwt');
    console.log('JWT Token:', jwtToken);
    console.log('Decoded Token:', this.decodeToken(jwtToken));
  }
  
  scheduleTraining(trainingRequest: any): Observable<any> {
    
    const trainerId = trainingRequest.trainer && trainingRequest.trainer.id;
    const trainingId = trainingRequest.training && trainingRequest.training.id;
  
    if (!trainerId || !trainingId) {
      console.error('Trainer or Training ID not available.');
      return throwError('Trainer or Training ID not available.');
    }
  
    const updatedTrainingRequest = {
      date: trainingRequest.date,
      trainer: {
        id: trainerId,
      },
      enterprise: {
        id: trainingRequest.enterprise?.id || null,
      },
      training: {
        id: trainingId,
      },
    };
    
    
    console.log('Updated Training Request:', updatedTrainingRequest);

    return this.http.post(BASE_URL + 'api/training-schedules/schedule', updatedTrainingRequest, {
      headers: this.createAuhtorizationHeader(),
      
      
    });
  }
  
  updateTrainingScheduleDate(eventId: string, newDate: string): Observable<any> {
    // Convert the string date to a Date object
    const dateObject = new Date(newDate);
  
    // Check if the dateObject is a valid date
    if (isNaN(dateObject.getTime())) {
      console.error('Invalid date format:', newDate);
      return throwError('Invalid date format');
    }
  
    // Convert the date to ISO format in Morocco time zone
    const isoDate = dateObject.toISOString();
  
    const updateRequest = {
      id: eventId,
      date: isoDate,
    };
  
    return this.http.put(BASE_URL + 'api/training-schedules/update-date', updateRequest, {
      headers: this.createAuhtorizationHeader(),
    });
  }

  // registerForTraining(trainingId: number, participantData: any): Observable<any> {
  //   return this.http.put(`${BASE_URL}api/register-training/${trainingId}`, participantData, {
  //     headers: this.createAuhtorizationHeader()
  //   });
  // }
  
  registerForTraining(trainingId: number, participantData: any): Observable<any> {
    return this.http.put(`${BASE_URL}register-training/${trainingId}`, participantData, {
      headers: this.createAuhtorizationHeader()
    });
  }

  getParticipants(trainingId?: number): Observable<any[]> {
    // If a trainingId is provided, fetch participants for that specific training
    if (trainingId !== undefined) {
      return this.http.get<any[]>(`${BASE_URL}api/trainings/participants/${trainingId}`, {
        headers: this.createAuhtorizationHeader()
      });
    } else {
      // If no trainingId is provided, fetch participants for all trainings
      return this.http.get<any[]>(`${BASE_URL}api/trainings/all/participants`, {
        headers: this.createAuhtorizationHeader()
      });
    }
  }
  
  associateFormateur(trainingId: number, formateurId: number, participantId: number): Observable<any> {
    const body = { participantId: participantId };  // Include the participant ID in the request body
    return this.http.put(`${BASE_URL}api/trainings/associate-formateur/${trainingId}/${formateurId}`, body, {
      headers: this.createAuhtorizationHeader()
    });
}


}
