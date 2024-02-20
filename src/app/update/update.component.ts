import { Component,Inject,OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManagerdetailsService } from '../managerdetails.service';
import { MasterserviceService } from '../masterservice.service';
 
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  constructor(public dialogRef: MatDialogRef<UpdateComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private adminService:ManagerdetailsService,private aService:MasterserviceService) {}
  prodetails:string=''
  selectedSkills:any[]=[]
  selectedSkillsid:number[]=[]
  skills:any[]=[]
  ngOnInit():void{
    this.aService.getProjectid(this.data.project).subscribe((res)=>{
      this.selectedSkills=res.projectskillsentity.map((skill: { skillName: any; })=>skill.skillName)
      this.prodetails=res.proName
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
        this.selectedSkillsid.splice(index, 1);
      }
      console.log(this.selectedSkillsid)
    }
    console.log(this.selectedSkillsid)
  }
  updateProject(){
    const updatePro={proName:this.prodetails,proskillids:this.selectedSkillsid}
    this.aService.updateProject(this.data.project,updatePro).subscribe((res)=>{
      alert(res.message)
    })
    this.dialogRef.close()
    location.reload()
  }
 
}