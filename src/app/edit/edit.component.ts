import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManagerdetailsService } from '../managerdetails.service';
import { MasterserviceService } from '../masterservice.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

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
  constructor(public dialogRef: MatDialogRef<EditComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private adminService:ManagerdetailsService,private aService:ManagerdetailsService) {}

  prodetails:string=''
  selectedSkillsid:number[]=[]
  ngOnInit():void{
    this.aService.getuserskillsbyid(this.data.user_id).subscribe((res:any)=>{
      console.log(this.data.user_id)
      this.selectedSkills=res.map((skill: { skillName: any; })=>skill.skillName)
      for(let skill of this.selectedSkills){
        this.aService.getSkillsId(skill).subscribe((res)=>{
          this.selectedSkillsid.push(res.id)
        })
      }
      console.log(this.selectedSkillsid)
    })
   
    
    this.getSkills()
  }
  getSkills():any[]{
    this.aService.getSkills().subscribe((res)=>{
      this.skills=res
    })
    console.log(this.skills)
    return this.skills;
  }
  NameChange(skill: number,skill_name:string, event: Event) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      // If checkbox is checked, add skill to the array
      this.selectedSkillsid.push(skill);
      this.selectedSkills.push(skill_name)
      console.log(this.selectedSkills)
    } else {
      // If checkbox is unchecked, remove skill from the array
      const index = this.selectedSkillsid.indexOf(skill);
      if (index !== -1) {
        this.selectedSkillsid.splice(index,1)
      }
      console.log(this.selectedSkillsid)
      console.log("hello")
      console.log(skill)
      // this.selectedSkills.pop()
      // this.selectedSkillsid.filter(id=>id!=skill)
      console.log(this.selectedSkillsid)
    }
  }
  updateUsers(){
    console.log(this.selectedSkillsid)
    const updateUsers={skillIds:this.selectedSkillsid}
    this.aService.updateemployeeSkills(this.data.user_id,updateUsers).subscribe((res)=>{
      console.log(res)
      alert("User Skills Updated Successfully")
    })
    this.dialogRef.close()
    location.reload()
  }

}
