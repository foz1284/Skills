import { Injectable } from '@angular/core';
import { Company } from './company';
import { CompanyProject } from './company-Project';
import { Project } from './Project';
import { ProjectSkill } from './project-skill';
import { Skill } from './Skill';
//import { COMPANIES } from './companies';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class SkillsService {
  companies:Company[];
  constructor(private http: HttpClient) { }
  //rootURL:String = "http://192.168.1.171:8080/api.php/";
  rootURL:String = "http://localhost:8080/api.php/";

  UserIsEditor(): boolean{
    return true;
  }

  getCompanies(): Promise<Company[]> {
    //return Promise.resolve(COMPANIES);

     return this.http.get(this.rootURL + 'company?transform=1')
      .toPromise()
      .then(response =>
        {
            return response['company'] as Company[];
        })
        .catch(this.handleError); 
  }

  getCompanyProjects(): Promise<CompanyProject[]> {
    //return Promise.resolve(CompanyProjects);

     return this.http.get(this.rootURL + 'companyproject?transform=1')
      .toPromise()
      .then(response => 
        {
            return response['companyproject'] as CompanyProject[];
        })
        .catch(this.handleError); 
  }

  getProjects(): Promise<Project[]> {
    //return Promise.resolve(CompanyProjects);

     return this.http.get(this.rootURL + 'projects?transform=1')
      .toPromise()
      .then(response =>
        {
            return response['projects'] as Project[];
        })
        .catch(this.handleError); 
  }

  getProjectSkills(): Promise<ProjectSkill[]> {
    //return Promise.resolve(CompanyProjects);

     return this.http.get(this.rootURL + 'projectskill?transform=1')
      .toPromise()
      .then(response =>
        {
            return response['projectskill'] as ProjectSkill[];
        })
        .catch(this.handleError); 
  }

  getSkills(): Promise<Skill[]> {
    //return Promise.resolve(CompanyProjects);

     return this.http.get(this.rootURL + 'skills?transform=1')
      .toPromise()
      .then(response =>
        {
            return response['skills'] as Skill[];
        })
        .catch(this.handleError); 
  }

  addCompany(name)
  {
    return this.http.post(this.rootURL + 'company',"{\"Name\":\"" + name + "\"}")
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  }

  deleteCompany(company:Company)
  {
    return this.http.delete(this.rootURL + 'company/' + company.ID)
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  }

  addProject(name)
  {
    return this.http.post(this.rootURL + 'projects',"{\"Name\":\"" + name + "\"}")
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  }

  deleteProject(project:Project)
  {
    return this.http.delete(this.rootURL + 'projects/' + project.ID)
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  }
  
  addCompanyProject(company:Company, project:Project)
  {
    return this.http.post(this.rootURL + 'companyproject',"{\"CompanyID\":\"" + company.ID + "\", \"ProjectID\":\"" + project.ID + "\"}")
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  }

  deleteCompanyProjectHelper(company: Company, project:Project)
  {
    return this.getCompanyProjects().then(companyProjects => {
      companyProjects.forEach(companyProject => {
          {
            if(companyProject.CompanyID == company.ID && companyProject.ProjectID == project.ID)
            {
              this.deleteCompanyProject(companyProject)
              .then(response =>
                {
                    return response;
                })
                .catch(this.handleError); 
            }
          } 
        });
    });
  }

  deleteCompanyProject(companyProject:CompanyProject)
  {
    return this.http.delete(this.rootURL + 'companyProject/' + companyProject.ID)
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  } 

  addSkill(name)
  {
    return this.http.post(this.rootURL + 'skills',"{\"Name\":\"" + name + "\"}")
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  }

  deleteSkill(skill:Skill)
  {
    return this.http.delete(this.rootURL + 'skills/' + skill.ID)
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  }
  
  addProjectSkill(project:Project, skill:Skill)
  {
    return this.http.post(this.rootURL + 'projectskill',"{\"ProjectID\":\"" + project.ID + "\", \"SkillID\":\"" + skill.ID + "\"}")
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  }

  deleteProjectSkillHelper(project:Project, skill:Skill)
  {
    return this.getProjectSkills().then(ProjectSkills => {
        ProjectSkills.forEach(projectskill => {
          {
            if(projectskill.ProjectID == project.ID && projectskill.SkillID == skill.ID)
            {
              this.deleteProjectSkill(projectskill)
              .then(response =>
                {
                    return response;
                })
                .catch(this.handleError); 
            }
          } 
        });
    });
  }

  deleteProjectSkill(projectSkill:ProjectSkill)
  {
    return this.http.delete(this.rootURL + 'projectskill/' + projectSkill.ID)
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  } 

  private extractData(res: Response) {
    let body = res.json();
    return body.data['company'] || { };
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
