import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BulkRegService {

  constructor(private http:HttpClient) { }
  uploadExcelFile(file:File):Observable<any>{
    const formData:FormData=new FormData()
    formData.append('file',file)
    return this.http.post('http://localhost:8080/api/auth/upload',formData)
  }
}
