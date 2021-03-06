import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { SkillsService } from '../skills.service';
import { Company } from '../company';
import { CompanyProject } from '../company-project';
import { Project } from '../project';
import { ProjectSkill } from '../project-skill';
import { Skill } from '../skill';
import { SkillComponent } from '../skill/skill.component';
import { SkillBaseComponent } from '../skill-base-Component';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.sass']
})

export class CompanyDetailsComponent extends SkillBaseComponent implements OnInit {
  private RequestedCompanyId: number;
  private Company: Company;
  private CurrentCompanyProjects: Project[];
  private CurrentCompanySkills: Skill[];

  
  constructor(private route: ActivatedRoute, private router: Router, private skillsService: SkillsService) {
    super(skillsService);

    this.CurrentCompanyProjects = [];
    this.CurrentCompanySkills = [];

    this.route.params.subscribe( params => {
      this.RequestedCompanyId = +params['id']; 

      this.skillsService.getCompanies()
      .then(companies =>
        { 
          companies.forEach(company => {
            if(company.ID == this.RequestedCompanyId)
              {
                this.Company = company;
              }
          });
        })
      .catch(err => 
        {
          alert("Could not retrieve Company Data" + err); 
          this.router.navigateByUrl('/company');
        });
        
        this.skillsService.getSkills()
        .then(skills => {
          this.skillsService.getProjectSkills()
          .then(projectSkills => {
            this.skillsService.getProjects()
            .then(Projects => {
              this.skillsService.getCompanyProjects()
              .then(companyProjects =>
                {
                companyProjects.forEach(companyProject => {
                  if(companyProject.CompanyID == this.RequestedCompanyId)
                    {
                      Projects.forEach(project => {
                        if(project.ID == companyProject.ProjectID)
                          {
                            this.CurrentCompanyProjects.push(project);

                            projectSkills.forEach(projectSkill => {
                              if(project.ID == projectSkill.ProjectID)
                              {
                                skills.forEach(skill => {
                                  if(projectSkill.SkillID == skill.ID)
                                  {
                                    if (!this.CurrentCompanySkills.some(function(s){return s.ID == skill.ID})) {
                                      /* vendors contains the element we're looking for */
                                      this.CurrentCompanySkills.push(skill);
                                    }                                    
                                  }
                                });
                              }
                            });
                          }
                      });
                    }
                });
              });
            });
          });
        });
    });
  }

 public onSubmit(name) {		
    this.skillsService.addProject(name).then(id => 
      {		
        let project = new Project();		
        project.ID = id;		
        project.Name = name;		
      
        this.skillsService.addCompanyProject(this.Company, project).then(id => {		
        this.CurrentCompanyProjects.push(project);		
        });   		
      })		
  }

  public onDeleteLink(project:Project){
    this.skillsService.deleteCompanyProjectHelper(this.Company, project)
    .then(count => {
      this.CurrentCompanyProjects.splice(this.CurrentCompanyProjects.indexOf(project), 1);
    });
    
    return false;
  }

  ngOnInit() {
  }
}