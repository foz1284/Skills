import { SkillsService } from './skills.service';

export class SkillBaseComponent {
    private Editor:boolean = true;

    constructor(private skillsSvc: SkillsService) {
        this.Editor = skillsSvc.UserIsEditor()
    }
}
