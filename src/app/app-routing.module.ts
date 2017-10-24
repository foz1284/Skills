import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { SkillComponent } from './skill/skill.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: []
  },
  {
    path: 'skill',
    component: SkillComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
