import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerdetailsService {
  
  constructor(private http:HttpClient) { }

  storeuser(data:any):Observable<any>{
    return this.http.post("http://www.localhost:8080/api/auth/manager-register",data) //check

  }
  getUsers():Observable<any[]>{
    return this .http.get<any[]>(`http://www.localhost:8080/api/manager/allemployees`)
  }
  getProjects():Observable<any[]>{
    return this.http.get<any[]>(`http://www.localhost:8080/api/manager/getprojects`)
  }
  getProjectId(username:string):Observable<any>{
    return this.http.get<any>(`http://www.localhost:8080/api/manager/getprojectid?pro_name=${username}`)
  }
  getSkills():Observable<any[]>{
    return this.http.get<any[]>(`http://www.localhost:8080/api/manager/getskills`)
  }
  getSkillsId(username:string):Observable<any>{
    return this.http.get<any>(`http://www.localhost:8080/api/manager/getskillsid?skillName=${username}`)
  }
  private url="http://www.localhost:8080/api/admin"
  approve(user_id: number): Observable<any> {
    return this.http.put(`${this.url}/verify?id=${user_id}`,{});
}
cancel(user_id:number):Observable<any>{
  return this.http.delete(`${this.url}/cancel?id=${user_id}`,{})
}
getuserskillsbyid(userId: number): Observable<any[]> {
  
  return this.http.get<any[]>(`http://www.localhost:8080/api/manager/getempskill?id=${userId}`);
  
}
assigndetails(user_id:number,pro_id:number,skillids:any):Observable<any>{
  return this.http.put(`http://www.localhost:8080/api/manager/assign?user_id=${user_id}&pro_id=${pro_id}`,skillids)
}
trainSkills(user_id:number,skillids:any):Observable<any>{
  return this.http.put(`http://www.localhost:8080/api/manager/updatetrainskills?id=${user_id}`,skillids)
}
getProjectid(id:number):Observable<any>{
  return this.http.get<any>(`http://www.localhost:8080/api/manager/getProdetbyid?pro_id=${id}`)
}
updateemployeeSkills(user_id:number,skillids:any):Observable<any>{
  return this.http.put(`http://www.localhost:8080/api/manager/updateempskills?user_id=${user_id}`,skillids)
}
}