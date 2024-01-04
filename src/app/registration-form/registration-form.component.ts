import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { UserdetailsService } from '../userdetails.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-registration-form',
    templateUrl:'./registration-form.component.html',
    styleUrls:['registration-form.component.css'],
    
})

export class RegistrationFormComponent{
    value:any;
    r:string[]=[]
    selectedRole:string=''
    empskillids:any[]=[]
    showDropdownMenu = false;
    skills: any[] = [];
    selectedSkills:any[]=[]
    locations:string[]=['Tamilnadu','AP'];
    colleges:{[key:string]:string[]}={
        'Tamilnadu':['tn1','tn2'],
        'AP':['ap1','ap2'],
    }
   
form:FormGroup;


constructor(private fb:FormBuilder, private http:HttpClient,private userdetails:UserdetailsService,private route:Router){
    this.form=this.fb.group({
        // userid:['',Validators.required],
        last_name:['',Validators.required],
        username:['', Validators.required],
        gender:['', Validators.required],
        dob:['', Validators.required],
        email: ['', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        // locations:['',Validators.required],
        // colleges:['', Validators.required],
        college_location:new FormControl(''),
        college_name:new FormControl(''),
        empskillids: []
    })


}
ngOnInit():void{
    this.getSkills()
}
toggleDropdownMenu(): void {
    this.showDropdownMenu = !this.showDropdownMenu;
  }
 
  
  toggleSkill(skill: string): void {
      this.userdetails.getSkillsId(skill).subscribe((res)=>{
          if (!this.empskillids.includes(res.id)) {
              this.empskillids.push(res.id);
              this.selectedSkills.push(res.skillName) // Add skill to selectedSkills array
            } else {
              this.empskillids = this.empskillids.filter(s => s !== res.id);
              this.selectedSkills = this.selectedSkills.filter(s => s !== res.skillName); // Remove skill from selectedSkills array
            }
            this.showDropdownMenu = false;
            
      })
      // Hide the dropdown after selecting/deselecting a skill
    }
   

 
  removeSkill(skill: string): void {
    this.selectedSkills = this.selectedSkills.filter(s => s !==skill);
    // Remove skill from selectedSkills array
    this.userdetails.getSkillsId(skill).subscribe((res)=>{
        this.empskillids = this.empskillids.filter(s => s !== res.id);
    })
 
  }
  getSkills():any[]{
    this.userdetails.getSkills().subscribe((res)=>{
      this.skills=res
    })
    console.log(this.skills)
    return this.skills;
  }

getColleges(){
    const selectedloc=this.form.get('college_location')?.value;
    return selectedloc ? this.colleges[selectedloc] || [] :[];
}
get formControls() {
    return this.form.controls;
  }
  get emailControl() {
    return this.form.get('email');
  }
submitForm() {
    const formDetails=JSON.parse(JSON.stringify(this.form.value))
    formDetails.empskillids = this.empskillids;
    
       if(this.form.valid)
        {
            this.userdetails.storeuserData(formDetails).subscribe((res)=>{
                console.log(res)
                alert("Registration Successful, Request is Sent")
            })
            console.log(formDetails)
            this.route.navigateByUrl('/login')
        
        }
        }
      
    //   updateSelectedRole(role: string): void {
    //     this.selectedRole = role;
    //     this.r.push(role);
    //   } 
    
}