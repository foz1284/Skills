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
 public onDelete(skill:Skill){
  this.skillsService.deleteSkill(skill)
  .then(count => {
    this.skills.splice(this.skills.indexOf(skill), 1);
  });
  
  return false;
}
  ngOnInit() {
  }

}
