import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient) { }

  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signup', signRequest)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest)
  }

  hello(): Observable<any> {
    return this.http.get(BASE_URL + 'api/hello', {
      headers: this.createAuthorizationHeader()
    })
  }

  trainings_add(trainingRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/trainings/add', trainingRequest, {
      headers: this.createAuthorizationHeader()
    });
  }

  Entreprise_add(entrepriseRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/admin/entreprises/add', entrepriseRequest, {
      headers: this.createAuthorizationHeader()
    });
  }

  getEntreprises(): Observable<any> {
    return this.http.get(BASE_URL + 'api/admin/entreprises/all', {
      headers: this.createAuthorizationHeader()
    });
  }

  getFormateurs(): Observable<any> {
    return this.http.get(BASE_URL + 'api/formateurs/all', {
      headers: this.createAuthorizationHeader()
    });
  }

  inscrireFormateur(formateurRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'inscrire', formateurRequest);
  }

  acceptFormateur(formateurId: number): Observable<any> {
    return this.http.post(BASE_URL + `/api/formateurs/accepter/${formateurId}`, null, {
      headers: this.createAuthorizationHeader()
    });
  }

  rejectFormateur(formateurId: number): Observable<any> {
    return this.http.post(BASE_URL + `/api/formateurs/refuser/${formateurId}`, null, {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set("Authorization", "Bearer " + jwtToken);
    } else {
      console.log("JWT token not found in local storage");
    }
    return null;
  }
  


}
