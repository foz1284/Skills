import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SkillComponent } from './skill/skill.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: []
  },
  { path: 'company', component: CompanyComponent },
  { path: 'company/:id', component: CompanyDetailsComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'project/:id', component: ProjectDetailsComponent },
  {
    path: 'skill',
    component: SkillComponent,
    children: []
  },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
