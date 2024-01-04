import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmindetailsService {

  constructor(private http:HttpClient) { }
  private url="http://www.localhost:8080/api/admin"
  storeuser(data:any):Observable<any>{
    return this.http.post("http://www.localhost:8080/api/auth/admin-register",data) //check

  }
  approve(user_id: number): Observable<any> {
    return this.http.put(`${this.url}/verify?id=${user_id}`,{});
}
  getUsers():Observable<any[]>{
    return this .http.get<any[]>(`${this.url}/allemployees`)
  }
  cancel(user_id:number):Observable<any>{
    return this.http.delete(`${this.url}/cancel?id=${user_id}`,{})
  }


}