import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ManagerPageComponent } from './manager-page/manager-page.component';
 
import { ManagerRegComponent } from './manager-reg/manager-reg.component';
import { AdminRegComponent } from './admin-reg/admin-reg.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { SkillPageComponent } from './skill-page/skill-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { BulkComponent } from './bulk/bulk.component';
import { AuthGuardService } from './auth-guard.service';
import { QuizComponent } from './quiz/quiz.component';
 
 
const routes: Routes = [
  {path: 'login', component: LoginFormComponent},
  {
   path:'',redirectTo:'login',pathMatch:'full'
  },
  {path: 'register', component: RegistrationFormComponent},
  {path:'manager-registration',component:ManagerRegComponent},
  {path:'admin-registration',component:AdminRegComponent},
 {
    path:'admin-page',component:AdminPageComponent,canActivate:[AuthGuardService]
  },{
    path:'manager-page',component:ManagerPageComponent,canActivate:[AuthGuardService]
  },{
    path:'user-page',component:UserPageComponent,canActivate:[AuthGuardService]
  },{
    path:'bulk-register',component:BulkComponent
  },
  {  path:'master-page',component:MasterPageComponent,canActivate:[AuthGuardService]},
{path:'master/project-page',component:SkillPageComponent,canActivate:[AuthGuardService]},{
  path:'master/skill-page',component:ProjectPageComponent,canActivate:[AuthGuardService]
},
{path:'quiz',component:QuizComponent,canActivate:[AuthGuardService]}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
