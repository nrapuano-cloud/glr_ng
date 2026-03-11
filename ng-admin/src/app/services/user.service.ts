import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  private apiUrl = '/api'; // o endpoint corretto
  getUsers(): Observable<any> {

    const body = new URLSearchParams();

    body.set('action', 'backbone');
    body.set('backbone_method', 'read');
    body.set('backbone_model', 'user');

    return this.http.post(this.apiUrl, body.toString());

  }

}
