import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ManagerdetailsService } from '../managerdetails.service';
import { MasterserviceService } from '../masterservice.service';
 
@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent {
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
  userName: string = '';
  userEmail: string = '';
  inputValues: string = ''; // Variable to store the input string
  parsedValues: string[] = [];
  constructor(public dialogRef: MatDialogRef<AddnewComponent>,private adminService:ManagerdetailsService,private aService:MasterserviceService) {}
  ngOnInit(): void {
    this.loadProjects()
    this.getSkills()
   
   
  }
 
 
  parseInputValues() {
    this.parsedValues = this.inputValues.split(',').map(value => value.trim());
    console.log('Parsed values:', this.parsedValues);
    // You can perform actions with the parsed values here
  }

  getEmployees():any[]{
    this.aService.getUsers().subscribe((res)=>{
      for(let user of res){
       if(user.role_name=='USER' && user.assign_status=='No'){
         this.users.push(user)
         if (this.users.length > 0) {
         
        }
     console.log(this.users)
       }
       
      }
     
  })
  return this.users
  }
  getSkills():any[]{
    this.aService.getSkills().subscribe((res)=>{
      this.skills=res
    })
    console.log(this.skills)
    return this.skills;
  }
  NameChange(skill: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      // If checkbox is checked, add skill to the array
      this.selectedSkills.push(skill);
      console.log(this.selectedSkills)
    } else {
      // If checkbox is unchecked, remove skill from the array
      const index = this.selectedSkills.indexOf(skill);
      if (index !== -1) {
        this.selectedSkills.splice(index, 1);
      }
      console.log(this.selectedSkills)
    }
  }
  loadProjects() {
    // Fetch projects from the service and assign them to this.projects
    this.aService.getProjects().subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error loading projects:', error);
      }
    );
  }
   
  submitForm(){
    const pro={proName:this.pro_name,proskillids:this.selectedSkills}
    this.aService.savePro(pro).subscribe((res)=>{
      alert(res.message)
      this.pro_name=''
      this.selectedSkills=[]
      this.getSkills()
    })
    this.dialogRef.close()
    window.location.reload()
  }

}