import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { SkillsService } from '../skills.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.sass']
})
export class CompanyComponent implements OnInit {
  companies:Company[];

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

  ngOnInit() {
  }
}
