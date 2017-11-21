import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../skills.service';
import { SkillBaseComponent } from '../skill-base-component';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent  extends SkillBaseComponent  implements OnInit {

  constructor(private skillsService: SkillsService) {
    super(skillsService);
   }

  ngOnInit() {
  }
}
