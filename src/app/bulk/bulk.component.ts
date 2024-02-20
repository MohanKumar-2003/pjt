import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserdetailsService } from '../userdetails.service';
import { Router } from '@angular/router';
import { BulkRegService } from '../bulk-reg.service';

@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.css']
})
export class BulkComponent {
  selectedFile:File | undefined
  value:any;
  locations:string[]=['Tamilnadu','AP'];
  colleges:{[key:string]:string[]}={
      'Tamilnadu':['tn1','tn2'],
      'AP':['ap1','ap2'],
  }
 

constructor(private fb:FormBuilder, private http:HttpClient, private userdetails:UserdetailsService,private router:Router,private excel:BulkRegService){


}
onFileSelected(event:any):void{
  this.selectedFile=event.target.files[0]
}
submitForm():void {
          if(this.selectedFile){
            this.excel.uploadExcelFile(this.selectedFile).subscribe((res)=>{
              alert(res.message)
            })
          }
          this.router.navigateByUrl('/login')
      
      }

    }