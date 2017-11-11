import { Injectable } from '@angular/core';
import { Company } from './company';
import { CompanyProject } from './company-Project';
import { Project } from './Project';
import { ProjectSkill } from './project-skill';
import { Skill } from './Skill';
import { COMPANIES } from './companies';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SkillsService {
  companies:Company[];
  constructor(private http: HttpClient) { }
  getCompanies(): Promise<Company[]> {
    //return Promise.resolve(COMPANIES);

     return this.http.get('http://localhost:8080/api.php/company?transform=1')
      .toPromise()
      .then(response =>
        {
            return response['company'] as Company[];
        })
        .catch(this.handleError); 
  }

  getCompanyProjects(): Promise<CompanyProject[]> {
    //return Promise.resolve(CompanyProjects);

     return this.http.get('http://localhost:8080/api.php/companyproject?transform=1')
      .toPromise()
      .then(response =>
        {
            return response['companyproject'] as CompanyProject[];
        })
        .catch(this.handleError); 
  }

  getProjects(): Promise<Project[]> {
    //return Promise.resolve(CompanyProjects);

     return this.http.get('http://localhost:8080/api.php/projects?transform=1')
      .toPromise()
      .then(response =>
        {
            return response['projects'] as Project[];
        })
        .catch(this.handleError); 
  }

  getProjectSkills(): Promise<ProjectSkill[]> {
    //return Promise.resolve(CompanyProjects);

     return this.http.get('http://localhost:8080/api.php/projectskill?transform=1')
      .toPromise()
      .then(response =>
        {
            return response['projectskill'] as ProjectSkill[];
        })
        .catch(this.handleError); 
  }

  getSkills(): Promise<Skill[]> {
    //return Promise.resolve(CompanyProjects);

     return this.http.get('http://localhost:8080/api.php/skills?transform=1')
      .toPromise()
      .then(response =>
        {
            return response['skills'] as Skill[];
        })
        .catch(this.handleError); 
  }

  addCompany(name)
  {
    return this.http.post("http://localhost:8080/api.php/company","{\"Name\":\"" + name + "\"}")
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  }

  deleteCompany(company)
  {
    return this.http.delete("http://localhost:8080/api.php/company/" + company.ID)
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  }

  addProject(name)
  {
    return this.http.post("http://localhost:8080/api.php/projects","{\"Name\":\"" + name + "\"}")
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  }
  
  addCompanyProject(company:Company, project:Project)
  {
    return this.http.post("http://localhost:8080/api.php/companyproject","{\"CompanyID\":\"" + company.ID + "\", \"ProjectID\":\"" + project.ID + "\"}")
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  }

  addSkill(name)
  {
    return this.http.post("http://localhost:8080/api.php/skills","{\"Name\":\"" + name + "\"}")
    .toPromise()
    .then(response =>
      {
          return response;
      })
      .catch(this.handleError); 
  }
  
  addProjectSkill(project:Project, skill:Skill)
  {
    return this.http.post("http://localhost:8080/api.php/projectskill","{\"ProjectID\":\"" + project.ID + "\", \"SkillID\":\"" + skill.ID + "\"}")
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
