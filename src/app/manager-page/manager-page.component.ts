
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserdetailsService } from '../userdetails.service';
import { Router } from '@angular/router';
import { AdmindetailsService } from '../admindetails.service';
import { ManagerdetailsService } from '../managerdetails.service';
import { __makeTemplateObject } from 'tslib';
import { FormBuilder, FormGroup } from '@angular/forms';
import   'jquery';
import 'datatables.net';
import { style } from '@angular/animations';
import { DataTableDirective } from 'angular-datatables';
declare const $: any;
@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})
export class ManagerPageComponent implements OnInit{
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
 
  dtOptions: DataTables.Settings = {};
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
  id:number=0
  check:boolean=true
  selectedUser:any
  formgp:FormGroup
  constructor(
    private authService: UserdetailsService,
    private router: Router,
    private adminService:ManagerdetailsService,
    private fb:FormBuilder
  ) {
    this.formgp=this.fb.group({
      emp_group:'',
      skillIds:[]
    })
   
  }
  logout(): void {
    this.authService.loggedout();
    this.router.navigate(['/login']);
  }
  navigateToComponent(route: string) {
    this.router.navigate([route]);
  }
 
  ngOnInit(): void {
    this.getEmployees()
    this.getProjects()
    this.getSkills()
    
   
  }
  // ngAfterViewInit(): void {
  //   if (this.users.length > 0) {
  //     this.initializeDatatable();
  //   }
  // }
  


  getEmployees():any[]{
  this.adminService.getUsers().subscribe((res)=>{
    for(let user of res){
     if(user.role_name=='USER' && user.assign_status=='No'){
       this.users.push(user)
       if (this.users.length > 0) {
        this.initializeDatatable();
      }
   console.log(this.users)
     }
     
    }
   
})
return this.users
}
 
initializeDatatable(): void {
  this.dtOptions = {
    responsive: true,
    paging: true,
    // Other DataTable options...
  };
 
  $(document).ready(() => {
    if ($.fn.DataTable.isDataTable('#usersTable')) {
      $('#usersTable').DataTable().destroy();
    }
    $('#usersTable').DataTable(this.dtOptions);
  });
}
// getEmployees(): any[] {
//   this.adminService.getUsers().subscribe((res) => {
//     for (let user of res) {
//       if (user.role_name == 'USER' && user.assign_status == 'No') {
//         this.users.push(user);
//       }
//     }
//     // Call initializeDatatable() only after all users are fetched
//     this.initializeDatatable();
//     console.log(this.users);
//   });
//   return this.users;
// }
getProjects():any[]{
  this.adminService.getProjects().subscribe((res)=>{
    for(let i of res){
      if(i.pro_status===false){
        this.projects.push(i)
      }
    }
  })
  console.log(this.pro_name)
  return this.projects;
}
onNameChange(user_id: number, pro_name: string): void {
  this.adminService.getProjectId(pro_name).subscribe((res) => {
    this.userProjects[user_id] = pro_name;
    console.log(this.userProjects);
    this.proj_id=res.pro_id
    console.log(this.proj_id)
  });
}
 
NameChange(user_id: number, skill_name: string): void {
  this.adminService.getuserskillsbyid(user_id).subscribe((res)=>{
    for(let skill of res){
      this.selectedSkills.push(skill.skillName)
    }})
  this.adminService.getSkillsId(skill_name).subscribe((res) => {
    this.id = res.id;
    if (!this.userSkills[user_id]) {
      this.userSkills[user_id] = [];
      this.skill_name=''
    }
 
    if (!this.userSkills[user_id].includes(res.skillName)) {
      this.userSkills[user_id].push(res.skillName);
      this.skillids.push(this.id);
      console.log(this.selectedSkills)
      if(!this.selectedSkills.includes(res.skillName)){
        this.check=false
        this.needtoTrainskill.push(res.skillName)
      }
   
    } else {
      alert("Skill is already added");
    }
    for(let name of this.needtoTrainskill){
      this.adminService.getSkillsId(name).subscribe((res)=>{
                    this.needtoTrainskillids.push(res.id)
                  })
        }
 
    console.log(this.userSkills);
    console.log(this.skillids);
  });
}
 
getSkills():any[]{
  this.adminService.getSkills().subscribe((res)=>{
    this.skills=res
  })
  console.log(this.skills)
  return this.skills;
}
 
assign(user_id:number):void{
  console.log(user_id)
 
    // for(let i of this.userSkills[user_id]){
    //   if(!this.selectedSkills.includes(i)){
    //           this.check=false
           
    //   }
    // }
    if(this.check){
      const formDetails={skillIds:this.skillids}
      console.log(formDetails)
      if(this.formgp.valid){
        this.adminService.assigndetails(user_id,this.proj_id,formDetails).subscribe((res)=>{
          this.skillids=[]
          this.dept=''
          this.projects=this.projects.filter(s=>s.pro_id!=this.proj_id)
          this.users=this.users.filter(s=>s.user_id!=user_id)
          this.skill_name=''
          alert(res.message)
        })
      }
    }
    else{
      const formDetails={skillIds:this.needtoTrainskillids}
      this.adminService.trainSkills(user_id,formDetails).subscribe((res)=>{
        console.log(res)
        this.needtoTrainskill=[]
        this.needtoTrainskillids=[]
        alert("Employee has insufficient skills, so his/her need to acquire skills sent successfully")
      })
     
    }
}
selectUser(user:any){
  this.selectedUser=user
}
clearUser(){
  this.selectedUser=null
}
}
 