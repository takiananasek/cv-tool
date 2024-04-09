import { Component } from '@angular/core';
import { ContactViewComponent } from './elements/contact-view/contact-view.component';
import { TitleViewComponent } from './elements/title-view/title-view.component';
import { TextfieldViewComponent } from './elements/textfield-view/textfield-view.component';
import { ListViewComponent } from './elements/list-view/list-view.component';
import { ProfileCardViewComponent } from './elements/profile-card-view/profile-card-view.component';
import { ProjectLinksViewComponent } from './elements/project-links-view/project-links-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeModel } from '../../models/resume.model';
import { ResumeService } from '../../services/resume.service';

@Component({
  selector: 'app-resume-view',
  standalone: true,
  imports: [
    ContactViewComponent,
    TitleViewComponent,
    TextfieldViewComponent,
    ListViewComponent,
    ProfileCardViewComponent,
    ProjectLinksViewComponent,
    ContactViewComponent,
  ],
  templateUrl: './resume-view.component.html',
  styleUrl: './resume-view.component.scss',
})
export class ResumeViewComponent {
  resumeData!: ResumeModel;
  resumeId!: number;

  constructor(private route: ActivatedRoute, private resumeService: ResumeService, private router: Router) {}

  ngOnInit() {
    if(!this.route.snapshot.paramMap.get('id')) this.router.navigate(['/home']);
    this.resumeId = Number(this.route.snapshot.paramMap.get('id'));
    this.resumeService.getResume(this.resumeId).subscribe(data => {
      this.resumeData = data;
    });
  }
}
