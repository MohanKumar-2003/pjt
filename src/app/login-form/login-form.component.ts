import { Component } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserdetailsService } from '../userdetails.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent{
  value:any;
  locations:string[]=['Tamilnadu','AP'];
  colleges:{[key:string]:string[]}={
      'Tamilnadu':['tn1','tn2'],
      'AP':['ap1','ap2'],
  }

formgp:FormGroup;
constructor(private fb:FormBuilder, private http:HttpClient, private userdetails:UserdetailsService,private router:Router){
  this.formgp=this.fb.group({
      username:['', Validators.required],
      // userid1:['',Validators.required],
      // lastname1:['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      

  });

}
submitForm() {
  // Check if the form is valid before submitting
  if (this.formgp.valid) {
     const loginDetails=JSON.parse(JSON.stringify(this.formgp.value))
     this.userdetails.loginuserData(loginDetails).subscribe((res:any)=>{if(res.success){
      const role=res.roles[0]
     alert("Login Success")
     localStorage.setItem('token',res.accessToken)
     console.log(role)
     if(role=='ROLE_USER'){
      this.router.navigateByUrl("user-page")
     }
     else if(role=='ROLE_ADMIN'){
      this.router.navigateByUrl("admin-page")
     }
     else if(role=='ROLE_MANAGER'){
      this.router.navigateByUrl("manager-page")
     }
     else if(role=='ROLE_MASTER'){
      this.router.navigateByUrl("master-page")
     }
     }else{
      alert(res.message)
     }})
  }
}
get formControls() {
  return this.formgp.controls;
}
}
