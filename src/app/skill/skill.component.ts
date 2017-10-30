import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../skills.service';
import { Skill } from '../skill';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.sass']
})
export class SkillComponent implements OnInit {
  skills:Skill[];

  constructor(private skillsService: SkillsService) {
    this.skillsService.getSkills()
    .then(skills =>
      { 
        this.skills = skills;
      })
    .catch(err => 
      {
        alert("Could not retrieve Skill Data" + err); 
      });   
 }

  ngOnInit() {
  }

}
