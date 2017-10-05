import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.sass']
})
export class CompanyComponent implements OnInit {

  companies:Company[] = [{
    ID: 1,
    Name: 'ATS'
  }];
  constructor() { 
    // var com = new Company();
    // com.ID = 1;
    // com.Name = 'ATS';

    // this.companies.push(com);


  }

  ngOnInit() {
  }

}
