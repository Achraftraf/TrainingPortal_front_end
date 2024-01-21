import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class JwtService {

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

  

}
