import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../skills.service';
import { Project } from '../project';
import { SkillBaseComponent } from '../skill-base-component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent extends SkillBaseComponent  implements OnInit {
  projects:Project[];

  constructor(private skillsService: SkillsService) {
    super(skillsService);

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

   public onDelete(project:Project){
    this.skillsService.deleteProject(project)
    .then(count => {
      this.projects.splice(this.projects.indexOf(project), 1);
    });

    return false;
  }

  ngOnInit() {
  }

}
