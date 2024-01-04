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


const routes: Routes = [
  {path: 'login', component: LoginFormComponent},
  {
   path:'',redirectTo:'login',pathMatch:'full'
  },
  {path: 'register', component: RegistrationFormComponent},
  {path:'manager-registration',component:ManagerRegComponent},
  {path:'admin-registration',component:AdminRegComponent},
 {
    path:'admin-page',component:AdminPageComponent
  },{
    path:'manager-page',component:ManagerPageComponent
  },{
    path:'user-page',component:UserPageComponent
  },
  {path:'master-page',component:MasterPageComponent},
{path:'skill-page',component:SkillPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
