import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { SkillsService } from '../skills.service';
import { Project } from '../project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.sass']
})
export class ProjectDetailsComponent implements OnInit {
  private RequestedProjectId: number;
  private Project: Project;

  constructor(private route: ActivatedRoute, private router: Router, private skillsService: SkillsService) { 
    this.route.params.subscribe( params => {
      this.RequestedProjectId = +params['id']; 

      this.skillsService.getProjects()
      .then(projects =>
        { 
          projects.forEach(project => {
            if(project.ID == this.RequestedProjectId)
              {
                this.Project = project;
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
