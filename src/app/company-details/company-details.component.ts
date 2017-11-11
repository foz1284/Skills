import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { SkillsService } from '../skills.service';
import { Company } from '../company';
import { CompanyProject } from '../company-project';
import { Project } from '../project';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.sass']
})

export class CompanyDetailsComponent implements OnInit {
  private RequestedCompanyId: number;
  private Company: Company;
  private CurrentCompanyProjects: Project[];
  
  constructor(private route: ActivatedRoute, private router: Router, private skillsService: SkillsService) {
    this.CurrentCompanyProjects = [];
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
        
        this.skillsService.getProjects()
        .then(Projects =>
        {
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
                      }
                  });
                }
            });
          });
        });
    });
  }

  public onSubmit(name) {
    this.skillsService.addProject(name).then(id => {
      let project = new Project();
      project.ID = id;
      project.Name = name;

      this.skillsService.addCompanyProject(this.Company, project).then(id => {
        this.CurrentCompanyProjects.push(project);
      });   
    })
  }

  ngOnInit() {
  }
}
