import { Injectable } from '@angular/core';
import { Company } from './company';
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

  private extractData(res: Response) {
    let body = res.json();
    return body.data['company'] || { };
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
