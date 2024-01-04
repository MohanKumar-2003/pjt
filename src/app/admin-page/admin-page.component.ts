import { Component, ViewChild } from '@angular/core';
import { UserdetailsService } from '../userdetails.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AdmindetailsService } from '../admindetails.service';
import   'jquery';
import 'datatables.net';
import { DataTableDirective } from 'angular-datatables';
declare const $: any;

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  constructor(
    private authService: UserdetailsService,
    private router: Router,
    private route:ActivatedRoute,
    private adminservice: AdmindetailsService
  ) {
  }
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  userId: number | undefined;
  users:any[]=[]
 
 
  logout(): void {
    this.authService.loggedout(); // Call the logout method from AuthService
    this.router.navigate(['/login']); // Navigate to the login page or any other appropriate route
  }
  navigateToComponent(route: string) {
    this.router.navigate([route]);
  }
 
  
  
  ngOnInit(): void {
  // Call the combined method in ngOnInit or wherever appropriate
  this.getEmployees()
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