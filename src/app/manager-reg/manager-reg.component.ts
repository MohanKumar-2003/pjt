import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserdetailsService } from '../userdetails.service';
import { Router } from '@angular/router';
import { ManagerdetailsService } from '../managerdetails.service';

@Component({
  selector: 'app-manager-reg',
  templateUrl: './manager-reg.component.html',
  styleUrls: ['./manager-reg.component.css']
})
export class ManagerRegComponent {
  value:any;
  r:string[]=[]
  department:any[]=['FS','MTS','CTOO','MS']
 
formmag:FormGroup;


constructor(private fb:FormBuilder, private http:HttpClient,private userdetails:ManagerdetailsService, private rt :Router){
  this.formmag=this.fb.group({
     
      department:['',Validators.required],
      username:['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      
     
  })


}


get formControls() {
  return this.formmag.controls;
}
get emailControl() {
  return this.formmag.get('email');
}
submitForm() {
  const formDetails=JSON.parse(JSON.stringify(this.formmag.value))
  
     if(this.formmag.valid)
      {
          this.userdetails.storeuser(formDetails).subscribe((res)=>{
              console.log(res)
              alert("Request is sent successfully")
          })
          console.log(formDetails)
          this.rt.navigateByUrl("/login")
         
      }
      }
    
    

}
