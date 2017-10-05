import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) { 
    // var com = new Company();
    // com.ID = 1;
    // com.Name = 'ATS';

    //this.companies.push(com);
  
    
    this.companies= [{
      ID: 1,
      Name: 'ATS'
    }];
    
    this.http.get('http://localhost:8080/api.php/company').subscribe(data => {
      // Read the result field from the JSON response.

      this.companies = data['company']['records'];
    });
  } 

  ngOnInit() {
  }
}
