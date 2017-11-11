import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { SkillsService } from '../skills.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.sass']
})
export class CompanyComponent implements OnInit {
  companies:Company[];
  companyName:string;
  
  constructor(private skillsService: SkillsService) { 
    this.skillsService.getCompanies()
    .then(companies =>
      { 
        this.companies = companies;
      })
    .catch(err => 
      {
        alert("Could not retrieve Company Data" + err); 
      }); 
  }  

  public onSubmit(name) {
    this.skillsService.addCompany(name)
    .then(id => {
      let company = new Company();
      company.ID = id;
      company.Name = name;
      this.companies.push(company);
    });   
  }

  public onDelete(company:Company){
    this.skillsService.deleteCompany(company)
    .then(count => {
      this.companies.splice(this.companies.indexOf(company), 1);
    });

    return false;
  }

  ngOnInit() {
  }
}
