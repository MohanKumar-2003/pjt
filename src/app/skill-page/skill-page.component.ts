import { HttpClient } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MasterserviceService } from '../masterservice.service';
import { UserdetailsService } from '../userdetails.service';
import { Route, Router } from '@angular/router';
import { ManagerdetailsService } from '../managerdetails.service';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog } from '@angular/material/dialog';
import { AddnewComponent } from '../addnew/addnew.component';


import   'jquery';
import 'datatables.net';




declare const $: any;
@Component({
  selector: 'app-skill-page',
  templateUrl: './skill-page.component.html',
  styleUrls: ['./skill-page.component.css']
})
export class SkillPageComponent implements OnInit,AfterViewInit,OnDestroy {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  users: any[] = [];
  pro_name:string=''
  projects:any[]=[]
 skillName:string=''
 skills:any[]=[]
 proj_id:number=0
 userProjects: { [key: number]: string } = {};
 id:number=0
 updateskillName:string=''
 updateskillName1:string=''
 updating:boolean=false
 constructor(private http:HttpClient,private dialog: MatDialog,private masterService:MasterserviceService,private authService:UserdetailsService,private router:Router,private adminService:ManagerdetailsService,){}

 ngOnInit():void{
  this.getSkills()
  this.getProjects()

  
 

 }
 ngAfterViewInit(): void {
 
}

ngOnDestroy(): void {
  // Destroy the DataTables instance when leaving the component
  if ($.fn.DataTable.isDataTable('#usersTable')) {
    $('#usersTable').DataTable().destroy();
  }
}

// initializeDataTable(): void {
//   this.dtOptions = {
//     responsive: true,
//     paging: true,
//     // Other DataTable options...
//   };
//   $(document).ready(() => {
//     if ($.fn.DataTable.isDataTable('#usersTable')) {
//       $('#usersTable').DataTable().destroy();
      
//     }
    
//     $('#usersTable').DataTable(this.dtOptions);
   
//   });
  

// }
getProjects():any[]{
  this.masterService.getProjects().subscribe((res)=>{
    for(let i of res){
      if(i.pro_status===false){
        this.projects.push(i)
          if (this.projects.length > 0) {
            this.initializeDataTable();}
      }
      
      
    }
   
  })
  console.log(this.pro_name)
 
  return this.projects;
 
}
initializeDataTable(): void {
  this.dtOptions = {
    responsive: true,
    paging: true,
    info:true,
    dom: 'Bfrtip' // Include buttons in the layout
    // Other DataTable options...
  };

  $(document).ready(() => {
    if ($.fn.DataTable.isDataTable('#usersTable')) {
      $('#usersTable').DataTable().destroy();
    }

    let table = $('#usersTable').DataTable(this.dtOptions);

    // Add buttons after initializing the DataTable
    table = $('#dataTable').DataTable(this.dtOptions);
  });
}


navigateToComponent(route: string) {
  this.router.navigate([route]);
}
logout(): void {
  this.authService.loggedout(); 
  this.router.navigate(['/login']); 
}

onNameChange(user_id: number, pro_name: string): void {
  this.adminService.getProjectId(pro_name).subscribe((res) => {
    this.userProjects[user_id] = pro_name;
    console.log(this.userProjects);
    this.proj_id=res.pro_id
    console.log(this.proj_id)
  });
  
}
 getSkills():any[]{
  this.masterService.getSkills().subscribe((res)=>{
    this.skills=res
  })
  console.log(this.skills)
  return this.skills;

}

update(id:number):void{
  const skillbject={skillName:this.updateskillName}
this.masterService.updateSkill(this.id,skillbject).subscribe((res)=>{
  console.log(res.message)
  const updateJson=this.skills.find(skill=>skill.id===this.id)
  updateJson.skillName=skillbject.skillName
  this.updateskillName1=''
  this.updating=false
})
}
delete(id:number):void{
this.masterService.deleteSkill(id).subscribe((res)=>{
  alert(res.message)
  this.skills=this.skills.filter((skill)=>skill.id!==id)
})
}

toggleupdate(id:number,skill:string){
 this.updating=true
 this.id=id
 this.updateskillName1=skill
}
addSkill():void{
  const newSkill={skillName:this.skillName}
 
  this.masterService.createSkill(newSkill).subscribe((res)=>{
    alert(res.message)
    this.skillName=''
    this.getSkills()
  })
}


openPopup() {
  const dialogRef = this.dialog.open(AddnewComponent, {
    width: '500px',
    height:'500px' // Set the width as required
    // You can add more configurations for the dialog here
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // Handle actions after the dialog is closed if needed
  });
}
editProject(projectId: number): void {
  // Implement edit functionality based on the project ID
  console.log(`Editing project with ID: ${projectId}`);
}

updateSkills(projectId: number): void {
  // Implement update skills functionality based on the project ID
  console.log(`Updating skills for project with ID: ${projectId}`);
}
}
 
