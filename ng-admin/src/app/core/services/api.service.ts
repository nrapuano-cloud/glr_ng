import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:9001/glr_api';

  constructor(private http: HttpClient) {}

  get(endpoint: string) {
    return this.http.get(this.baseUrl + endpoint);
  }

  post(endpoint: string, data: any) {
    return this.http.post(this.baseUrl + endpoint, data);
  }

}