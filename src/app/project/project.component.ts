import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../skills.service';
import { Project } from '../project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
  projects:Project[];

  constructor(private skillsService: SkillsService) {
    this.skillsService.getProjects()
    .then(projects =>
      { 
        this.projects = projects;
      })
    .catch(err => 
      {
        alert("Could not retrieve Skill Data" + err); 
      }); 
   }

  ngOnInit() {
  }

}
