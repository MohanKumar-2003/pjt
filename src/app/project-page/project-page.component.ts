import { Component, ViewChild } from '@angular/core';
import { MasterserviceService } from '../masterservice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserdetailsService } from '../userdetails.service';
import { DataTableDirective } from 'angular-datatables';
import   'jquery';
import 'datatables.net';
import { MatDialog } from '@angular/material/dialog';
import { UpdSkillComponent } from '../upd-skill/upd-skill.component';
declare const $: any;
@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  skillName:string=''
  skills:any[]=[]
  id:number=0
  updateskillName:string=''
  updateskillName1:string=''
  updating:boolean=false
  constructor(private http:HttpClient,private masterService:MasterserviceService,private authService:UserdetailsService,private router:Router,private dialog: MatDialog){}
  ngOnInit():void{
   this.getSkills()
   
  }
  getSkills():any[]{
   this.masterService.getSkills().subscribe((res)=>{
     this.skills=res
     this.initializeDatatable()
   })
   console.log(this.skills)
   return this.skills;
 }
 initializeDatatable(): void {
  this.dtOptions = {
    responsive: true,
    paging: true,
    // Other DataTable options...
  };

  $(document).ready(() => {
    if ($.fn.DataTable.isDataTable('#skillsTable')) {
      $('#skillsTable').DataTable().destroy();
    }
    $('#skillsTable').DataTable(this.dtOptions);
  });
}
 logout(): void {
  this.authService.loggedout();
  this.router.navigate(['/login']); 
}
navigateToComponent(route: string) {
  this.router.navigate([route]);
}

 update():void{
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
   location.reload()
 })
 }

 addSkill():void{
   const newSkill={skillName:this.skillName}
  
   this.masterService.createSkill(newSkill).subscribe((res)=>{
     alert(res.message)
     this.skillName=''
     this.loadSkills()
     location.reload()
   })
 }
 openPopup(id:number,name:string) {
  
  const dialogRef = this.dialog.open(UpdSkillComponent, {
    data:{skillids:id,skillname:name},
    width: '600px',
    height:'600px' // Set the width as required
    // You can add more configurations for the dialog here
  });
 
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.loadSkills()
    // Handle actions after the dialog is closed if needed
  });
}
toggleupdate(id:number,skill:string){
  this.updating=true
  this.id=id
  this.updateskillName1=skill
  
 }
 loadSkills() {
  // Fetch projects from the service and assign them to this.projects
  this.masterService.getSkills().subscribe(
    (skills) => {
      this.skills = skills;
    },
    (error) => {
      console.error('Error loading projects:', error);
    }
  );
}
}
