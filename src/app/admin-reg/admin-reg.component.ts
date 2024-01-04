import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmindetailsService } from '../admindetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-reg',
  templateUrl: './admin-reg.component.html',
  styleUrls: ['./admin-reg.component.css']
})
export class AdminRegComponent {

  value:any;
  r:string[]=[]
  
 
formmag:FormGroup;


constructor(private fb:FormBuilder, private http:HttpClient,private userdetails:AdmindetailsService, private rt :Router){
  this.formmag=this.fb.group({
     
      
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
              alert("Admin Registration Successful, Request is Sent")
          })
          console.log(formDetails)
          this.rt.navigateByUrl("/login")
         
      }
      }
    
    

}