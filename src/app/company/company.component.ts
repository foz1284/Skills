import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.sass']
})
export class CompanyComponent implements OnInit {
  companies:Company[];
  
  constructor(private http: HttpClient) {    
    this.http.get('http://localhost:8080/api.php/company').subscribe(data => {
      this.companies = data['company']['records'];
    });
  } 

  ngOnInit() {
  }
}
