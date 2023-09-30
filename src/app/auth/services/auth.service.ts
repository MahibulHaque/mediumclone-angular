import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { Observable, map } from 'rxjs';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { environment } from 'src/environments/environment';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { CurrentUserInputInterface } from 'src/app/shared/types/currentUserInput.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = 'https://api.realworld.io/api' + '/users';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response) => response.user));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login';

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user';
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }
  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  updateCurrentUser(
    currentUserInput: CurrentUserInputInterface
  ): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user';

    return this.http
      .put<AuthResponseInterface>(url, { user: currentUserInput })
      .pipe(map(this.getUser));
  }
}
