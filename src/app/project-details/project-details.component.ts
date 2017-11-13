import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { SkillsService } from '../skills.service';
import { Project } from '../project';
import { Skill } from '../skill';
import { Company } from '../company';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.sass']
})
export class ProjectDetailsComponent implements OnInit {
  private RequestedProjectId: number;
  private Project: Project;
  private CurrentProjectSkills: Skill[];
  private CurrentProjectCompanies: Company[];
  private Skills: Skill[];

  public AddSkill(event, item) {
    alert('Open ' + item);
  }

  public AddCompany(event, item) {
    alert('AddCompany ' + item);
  }

  constructor(private route: ActivatedRoute, private router: Router, private skillsService: SkillsService) { 
    this.CurrentProjectSkills = [];
    this.CurrentProjectCompanies = [];
    this.route.params.subscribe( params => {
      this.RequestedProjectId = +params['id']; 

      this.skillsService.getProjects()
      .then(projects =>
        { 
          projects.forEach(project => {
            if(project.ID == this.RequestedProjectId)
              {
                this.Project = project;
              }
          });
        })
      .catch(err => 
        {
          alert("Could not retrieve Project Data" + err); 
          this.router.navigateByUrl('/project');
        });


      this.skillsService.getCompanies()
      .then(companies =>
        { 
          this.skillsService.getCompanyProjects()
          .then(projectCompanies =>
            {
              projectCompanies.forEach(companyProject => {
        
              if(companyProject.ProjectID == this.RequestedProjectId)
                {
                  companies.forEach(company => {
                    if(company.ID == companyProject.CompanyID)
                      {
                        this.CurrentProjectCompanies.push(company);
                      }
                  });
                }
            });
          });
        });

      this.skillsService.getSkills()
      .then(skills =>
      {
        this.Skills = skills;
        this.skillsService.getProjectSkills()
        .then(projectSkills =>
          {
            projectSkills.forEach(projectSkill => {
      
            if(projectSkill.ProjectID == this.RequestedProjectId)
              {
                skills.forEach(skill => {
                  if(skill.ID == projectSkill.SkillID)
                    {
                      this.CurrentProjectSkills.push(skill);
                    }
                });
              }
          });
        });
      });
    });
  }

  public onSubmit(name) {
    this.skillsService.addSkill(name).then(id => {
      let skill = new Skill();
      skill.ID = id;
      skill.Name = name;

      this.skillsService.addProjectSkill(this.Project, skill).then(id => {
        this.CurrentProjectSkills.push(skill);
      });   
    })
  }

  public onSelect(skill:Skill) {
      this.skillsService.addProjectSkill(this.Project, skill).then(id => {
        this.CurrentProjectSkills.push(skill);
      });
  }

  public onDeleteLink(skill:Skill){
    this.skillsService.deleteProjectSkillHelper(this.Project, skill)
    .then(count => {
      this.CurrentProjectSkills.splice(this.CurrentProjectSkills.indexOf(skill), 1);
    });
    
    return false;
  }

  ngOnInit() {
  }

}
