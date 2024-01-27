import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer, Training, TrainingSchedule } from '../components/planification/model';

const BASE_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  getTrainerDetails(trainerId: number): Observable<Training> {
    return this.http.get<Training>(`${BASE_URL}api/trainers/${trainerId}`, {
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
    return this.http.get<Training[]>(BASE_URL + 'api/trainings/all', {
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



  getFilteredTrainings(category: string, city: string, date: string): Observable<any> {
    // Create query parameters for filtering
    let params = new HttpParams();
    if (category) {
      params = params.set('category', category);
    }
    if (city) {
      params = params.set('city', city);
    }
    if (date) {
      params = params.set('date', date);
    }

    // Make the API call with query parameters
    return this.http.get(BASE_URL + 'api/trainings/filtered', {
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
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
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
    return this.http.post(BASE_URL + 'api/training-schedules/schedule', trainingRequest, {
      headers: this.createAuhtorizationHeader()
    });
  }
  

}
