import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { SkillsService } from '../skills.service';
import { Skill } from '../skill';
import { Project } from '../project';
import { SkillBaseComponent } from '../skill-base-component';

@Component({
  selector: 'app-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.sass']
})
export class SkillDetailsComponent extends SkillBaseComponent  implements OnInit {
  private CurrentSkillProjects: Project[];
  private RequestedSkillId: number;
  private Skill: Skill;

  constructor(private route: ActivatedRoute, private router: Router, private skillsService: SkillsService) { 
    super(skillsService);
    
    this.CurrentSkillProjects = [];
    this.route.params.subscribe( params => {
      this.RequestedSkillId = +params['id']; 

      this.skillsService.getSkills()
      .then(skills =>
        { 
          skills.forEach(skill => {
            if(skill.ID == this.RequestedSkillId)
              {
                this.Skill = skill;
              }
          });
        })
      .catch(err => 
        {
          alert("Could not retrieve Skill Data" + err); 
          this.router.navigateByUrl('/skill');
        });
      });

      this.skillsService.getProjects()
      .then(projects =>
      {
        this.skillsService.getProjectSkills()
        .then(projectSkills =>
          {
            projectSkills.forEach(projectSkill => {
      
            if(projectSkill.SkillID == this.RequestedSkillId)
              {
                projects.forEach(project => {
                  if(project.ID == projectSkill.ProjectID)
                    {
                      this.CurrentSkillProjects.push(project);
                    }
                });
              }
          });
        });
      });
     }

  ngOnInit() {
  }

}
