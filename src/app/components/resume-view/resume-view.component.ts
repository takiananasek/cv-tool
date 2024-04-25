import {
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ContactViewComponent } from './elements/contact-view/contact-view.component';
import { TitleViewComponent } from './elements/title-view/title-view.component';
import { TextfieldViewComponent } from './elements/textfield-view/textfield-view.component';
import { ListViewComponent } from './elements/list-view/list-view.component';
import { ProfileCardViewComponent } from './elements/profile-card-view/profile-card-view.component';
import { ProjectLinksViewComponent } from './elements/project-links-view/project-links-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeComponentModel, ResumeModel } from '../../models/resume.model';
import { ResumeService } from '../../services/resume.service';
import { WorkspaceItemType } from '../../models/workspaceItemType.model';
import { ResumeViewItem } from './elements/viewItem';

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
  @ViewChild('parent', { static: true, read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  @ViewChild('profileCard')
  profileCardRef!: any;
  resumeData!: ResumeModel;
  profileData!:ResumeComponentModel;

  resumeId!: number;

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.route.snapshot.paramMap.get('id'))
      this.router.navigate(['/home']);

    this.resumeId = Number(this.route.snapshot.paramMap.get('id'));

    this.resumeService.getResume(this.resumeId)
    .subscribe((data) => {
      this.resumeData = data;
      this.profileData=
        this.resumeData.components.find(
          (c) => c.componentType == WorkspaceItemType.ProfileCardElement
        ) ?? <ResumeComponentModel>{};
      this.profileData=
        this.resumeData.components.find(
          (c) => c.componentType == WorkspaceItemType.ProfileCardElement
        ) ?? <ResumeComponentModel>{};

      this.resumeData.components.map((c) => {
        if (c.componentType !== WorkspaceItemType.ProfileCardElement) {
          let workspaceItem = new ResumeViewItem(c.componentType);
          const componentRef = this.viewContainerRef?.createComponent(
            workspaceItem.component
          );
          componentRef.setInput('componentData', c);
        }
      });
    });
  }
}
