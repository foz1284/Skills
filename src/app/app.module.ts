import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { NavigationComponent } from './navigation/navigation.component';

import {HttpClientModule} from '@angular/common/http';
import { SkillComponent } from './skill/skill.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { ErrorComponent } from './error/error.component';

import { SkillsService } from './Skills.Service';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    NavigationComponent,
    SkillComponent,
    CompanyDetailsComponent,
    ErrorComponent,
    ProjectComponent,
    ProjectDetailsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SkillsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
