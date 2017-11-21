import { Component, OnInit } from '@angular/core';
import { SkillBaseComponent } from '../skill-base-component';
import { SkillsService } from '../skills.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent extends SkillBaseComponent  implements OnInit {

  constructor(private skillsService: SkillsService) {
    super(skillsService);
   }

  ngOnInit() {
  }

}
