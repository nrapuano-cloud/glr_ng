import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  setAuth(token: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }

}