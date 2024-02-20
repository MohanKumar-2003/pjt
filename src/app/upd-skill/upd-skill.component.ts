// import { Component } from '@angular/core';
// import { MasterserviceService } from '../masterservice.service';

// @Component({
//   selector: 'app-upd-skill',
//   templateUrl: './upd-skill.component.html',
//   styleUrls: ['./upd-skill.component.css']
// })

// export class UpdSkillComponent  {
//   skillName:string=''
//   skills:any[]=[]
//   id:number=0
  
//   updateskillName:string=''
//   updateskillName1:string=''
//   updating:boolean=false
//   constructor(private masterService:MasterserviceService){}
//   ngOnInit():void{
//     this.getSkills()
    
//    }
 
//    getSkills():any[]{
//     this.masterService.getSkills().subscribe((res)=>{
//       this.skills=res
      
//     })
//     console.log(this.skills)
//     return this.skills;
//   }
//   update():void{
    
//     const skillbject={skillName:this.updateskillName}
//   this.masterService.updateSkill(this.id,skillbject).subscribe((res)=>{
//     console.log(res.message)
//     const updateJson=this.skills.find(skill=>skill.id===this.id)
//     updateJson.skillName=skillbject.skillName
//     this.updateskillName1=''
//     this.updating=false
//   })
//   }

// }
import { Component,Inject,OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManagerdetailsService } from '../managerdetails.service';
import { MasterserviceService } from '../masterservice.service';
 
@Component({
     selector: 'app-upd-skill',
     templateUrl: './upd-skill.component.html',
     styleUrls: ['./upd-skill.component.css']
  })
export class UpdSkillComponent {
  constructor(public dialogRef: MatDialogRef<UpdSkillComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private adminService:ManagerdetailsService,private aService:MasterserviceService) {}
  prodetails:string=this.data.skillname
  selectedSkills:any[]=[]
  selectedSkillsid:number[]=[]
  skills:any[]=[]
  
  update():void{
    
        const skillbject={skillName:this.prodetails}
      this.aService.updateSkill(this.data.skillids,skillbject).subscribe((res)=>{
        console.log(res.message)
      
       
      })
      }
      submitForm() {
        // Perform actions on form submission
        // For example, you can close the dialog and pass data back if needed
        this.dialogRef.close({  });
        location.reload()
      }
    }
 
