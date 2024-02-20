import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CustomInterceptor } from './custom.interceptor';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ManagerPageComponent } from './manager-page/manager-page.component';
 
import { AdminRegComponent } from './admin-reg/admin-reg.component';
import { ManagerRegComponent } from './manager-reg/manager-reg.component';
 
import { MasterPageComponent } from './master-page/master-page.component';
import { DataTablesModule } from 'angular-datatables';
import { SkillPageComponent } from './skill-page/skill-page.component';
import DataTable from 'datatables.net-dt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddnewComponent } from './addnew/addnew.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateComponent } from './update/update.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { UpdSkillComponent } from './upd-skill/upd-skill.component';
import { EditComponent } from './edit/edit.component';
import { BulkComponent } from './bulk/bulk.component';
import { QuizComponent } from './quiz/quiz.component';
 
@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    UserPageComponent,
    AdminPageComponent,
    ManagerPageComponent,
    UserPageComponent,
    AdminRegComponent,
    ManagerRegComponent,
    MasterPageComponent,
    SkillPageComponent,
    AddnewComponent,
    UpdateComponent,
    ProjectPageComponent,
    UpdSkillComponent,
    EditComponent,
   BulkComponent,
   QuizComponent
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   DataTablesModule,
   BrowserAnimationsModule,
   MatDialogModule
   
   
   
   
 
 
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:CustomInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
