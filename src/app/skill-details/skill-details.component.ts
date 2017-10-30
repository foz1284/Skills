import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { SkillsService } from '../skills.service';
import { Skill } from '../skill';

@Component({
  selector: 'app-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.sass']
})
export class SkillDetailsComponent implements OnInit {

  private RequestedSkillId: number;
  private Skill: Skill;

  constructor(private route: ActivatedRoute, private router: Router, private skillsService: SkillsService) { 
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
     }

  ngOnInit() {
  }

}
