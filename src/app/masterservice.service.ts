import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class MasterserviceService {
 
  constructor(private http:HttpClient) { }
  private url="http://www.localhost:8080/api/master"
  approve(user_id: number): Observable<any> {
    return this.http.put(`${this.url}/verify?id=${user_id}`,{});
}
  getUsers():Observable<any[]>{
    return this .http.get<any[]>(`${this.url}/allemployees`)
  }
  cancel(user_id:number):Observable<any>{
    return this.http.delete(`${this.url}/cancel?id=${user_id}`,{})
  }
  getSkills():Observable<any[]>{
    return this.http.get<any[]>(`http://www.localhost:8080/api/master/getskills`)
  }
  updateSkill(id:number,skillset:any):Observable<any>{
    return this.http.put(`http://www.localhost:8080/api/master/updateSkill?id=${id}`,skillset)
  }
  deleteSkill(id:number):Observable<any>{
    return this.http.delete(`http://www.localhost:8080/api/master/deleteSkill?id=${id}`)
  }
  createSkill(skillset:any):Observable<any>{
    return this.http.post(`http://www.localhost:8080/api/master/saveskill`,skillset)
  }
  getProjects():Observable<any[]>{
    return this.http.get<any[]>(`http://www.localhost:8080/api/master/getprojects`)
  }
  getSkillsId(username:string):Observable<any>{
    return this.http.get<any>(`http://www.localhost:8080/api/master/getskillsid?skillName=${username}`)
  }
  savePro(pro:any):Observable<any>{
    return this.http.post(`http://www.localhost:8080/api/master/saveProject`,pro)
  }
  deleteProject(id:number):Observable<any>{
    return this.http.delete(`http://www.localhost:8080/api/master/deleteProject?id=${id}`)
  }
  getProjectid(id:number):Observable<any>{
    return this.http.get<any>(`http://www.localhost:8080/api/master/getProdetbyid?pro_id=${id}`)
  }
  updateProject(id:number,pro:any):Observable<any>{
    return this.http.put(`http://www.localhost:8080/api/master/updateProject?id=${id}`,pro)
  }
}
