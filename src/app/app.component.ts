import { Component } from '@angular/core';
import { SkillsService } from './skills.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [SkillsService]
})
export class AppComponent {
  title = 'app';
}
