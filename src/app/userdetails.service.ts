import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
  

  constructor(private http:HttpClient) { }

  storeuserData(data:any):Observable<any>{
    return this.http.post("http://www.localhost:8080/api/auth/register",data) //check
  }
  // storemanagerData(data:any):Observable<any>{
  //   return this.http.post("http://www.localhost:8080/api/auth/manager-register",data) //check
  // }
  // storeadminData(data:any):Observable<any>{
  //   return this.http.post("http://www.localhost:8080/api/auth/admin-register",data) //check
  // }

  loginuserData(data:any):Observable<any>{
    return this.http.post("http://www.localhost:8080/api/auth/login",data)
  }
  loggedout(): void {
    
    localStorage.removeItem('token');
  }
  getSkills():Observable<any[]>{
    return this.http.get<any[]>(`http://www.localhost:8080/api/auth/getskills`)
  }
  getSkillsId(username:string):Observable<any>{
    return this.http.get<any>(`http://www.localhost:8080/api/auth/getskillsid?skillName=${username}`)
  }
  getneedtoTrainskills(id:number):Observable<any>{
    return this.http.get<any>(`http://www.localhost:8080/api/user/getempskill?id=${id}`)
  }
  setUsername(name:string){
    localStorage.setItem('user',name)
  }
  getUsername(){
   return localStorage.getItem('user')
  }
  clearUsername(){
    localStorage.removeItem('user')
  }
  getempdetailsByName(name:string){
    return this.http.get(`http://www.localhost:8080/api/user/getempid?name=${name}`)
  }
}
