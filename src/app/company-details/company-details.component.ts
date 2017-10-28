import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { SkillsService } from '../skills.service';
import { Company } from '../company';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.sass']
})

export class CompanyDetailsComponent implements OnInit {
  public RequestedCompanyId: number;
  public Company: Company;
  
  constructor(private route: ActivatedRoute, private router: Router, private skillsService: SkillsService) {
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
    });
  }

  ngOnInit() {
  }

}
