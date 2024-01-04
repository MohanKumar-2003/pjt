import { Component, OnInit, ViewChild } from '@angular/core';
import { UserdetailsService } from '../userdetails.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterserviceService } from '../masterservice.service';
import { DataTableDirective } from 'angular-datatables';
import   'jquery';
import 'datatables.net';
declare const $: any;
@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})

export class MasterPageComponent implements OnInit{
  constructor(
    private authService: UserdetailsService,
    private router: Router,
    private route:ActivatedRoute,
    private adminservice: MasterserviceService
  ) {
  }
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  users: any[] = []; // Your data goes here
  

  userId: number | undefined;
 
  logout(): void {
    this.authService.loggedout();
    this.router.navigate(['/login']); 
  }
  navigateToComponent(route: string) {
    this.router.navigate([route]);
  }
 
  
  ngOnInit(): void {
    this.getEmployees();
    // Initialize DataTables inside ngOnInit
    
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
  


  getEmployees():any[]{
    this.adminservice.getUsers().subscribe((res)=>{
      console.log(this.users)
         for(let user of res){
          if(user.verify===false){
            this.users.push(user)
          }
         }
         this.initializeDatatable();
     console.log(this.users)
    })
    return this.users
  }

  // filterUsers(users:any[]):any[]{
      
  //     for(let user of users){
  //       if(user.verify===false){
  //         this.needUsers.push(user)
  //       }
  //     }
  //     console.log(this.needUsers
  //     return this.needUsers
  //     }
  
  approve1(user_id:number): void {
      this.adminservice.approve(user_id).subscribe(
        (res) => {
          alert(res.message);
          this.users=this.users.filter(p=>p.user_id!==user_id)
        },
        (error) => {
          alert('Error occurred while approving');
        }
      );
        
  }
  cancel(user_id:number):void{
    alert("Approval cancellation successful")
    this.users=this.users.filter(skill=>skill.user_id!==user_id)
    }
}
