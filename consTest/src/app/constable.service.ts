import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstableService {

  // Here i am using node js api

  BASE_URL: string = 'http://localhost:8000/userapi';

  // Here i am setting header because by using this cors communicate with database.

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) { }
  postUsersDetails(data: any) {
    let API_URL = `${this.BASE_URL}/add`;
    return this.http.post(API_URL, data);
  }

  getAllUserDetails() {
    return this.http.get(`${this.BASE_URL}/find`);
  }
  getSpecificUserDetails(id: any) {
    return this.http.get(`${this.BASE_URL}/find/${id}`);
  }
  updateUserDetails(data: any, id: any) {
    console.log(data);
    let API_URL = `${this.BASE_URL}/update/${id}`;
    return this.http.patch(API_URL, data, { headers: this.httpHeaders });
  }
  deleteUserDetails(id: any) {
    let API_URL = `${this.BASE_URL}/remove/${id}`;
    return this.http.delete(API_URL, { headers: this.httpHeaders });
  }
}
