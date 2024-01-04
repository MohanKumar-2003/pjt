import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserdetailsService } from '../userdetails.service';
import { Router } from '@angular/router';
import { AdmindetailsService } from '../admindetails.service';
import { ManagerdetailsService } from '../managerdetails.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  id:number=0;
  users: any[] = []; // Your data goes here
 
  gbl:any[]=['FS','MS','MTS','CTOO']
 
  proj_id:number=0
  pro_name:string=''
  emp_group:string=''
  userskills:any[]=[]
  projects:any[]=[]
  skill_name:string=''
  skills:any[]=[]
  skillids:number[]=[]
  selectedSkills:any[]=[]
  needtoTrainskill:any[]=[]
  needtoTrainskillids:any[]=[]
  userProjects: { [key: number]: string } = {};
userSkills: { [key: number]: string[] } = {};
dept:string=''
  i:any[]=[]
  skill:any[]=[]

  check:boolean=true
  selectedUser:any
constructor(private http:HttpClient,  private authService: UserdetailsService,
  private router: Router,private userService:UserdetailsService, private adminService:AdmindetailsService,private manager:ManagerdetailsService){
    
 
  this.loaduser()
 
}
name:any=this.userService.getUsername()
 
data:string=''

loaduser():any{
this.userService.getempdetailsByName(this.name).subscribe((res:any)=>{
  this.id=res.user_id
  console.log(this.id)
  this.getSkills()
})
}
getSkills(){
  this.userService.getneedtoTrainskills(this.id).subscribe((res:any)=>{
    this.skills=res
  })
}
getProjects():any[]{
  this.manager.getProjects().subscribe((res)=>{
    for(let i of res){
      if(i.pro_status===false){
        this.projects.push(i)
      }
    }
  })
  console.log(this.pro_name)
  return this.projects;
}
 
logout(): void {
  this.authService.loggedout(); // Call the logout method from AuthService
  this.router.navigateByUrl('/login'); // Navigate to the login page or any other appropriate route
}


getEmployees():any[]{
  this.adminService.getUsers().subscribe((res)=>{
    for(let user of res){
     if(user.role_name=='USER' && user.assign_status=='No'){
       this.users.push(user)
     
   console.log(this.users)
     }
     
    }
   
})
return this.users
}
}