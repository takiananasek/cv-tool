import { Component, ViewChild, ViewContainerRef } from '@angular/core';
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

   tempData = {
    "id": 2,
    "ownerId": 1,
    "components": [
        {
            "componentDocumentId": 0,
            "componentType": 3,
            "componentEntries": [
                {
                    "label": "name",
                    "value": "Nina",
                    "children": []
                },
                {
                    "label": "jobTitle",
                    "value": "Angular Dev",
                    "children": []
                },
                {
                    "label": "description",
                    "value": "Lalallala",
                    "children": []
                }
            ]
        },
        {
            "componentDocumentId": 1,
            "componentType": 2,
            "componentEntries": [
                {
                    "label": "title",
                    "value": "wswswsws",
                    "children": []
                }
            ]
        },
        {
            "componentDocumentId": 2,
            "componentType": 0,
            "componentEntries": [
                {
                    "label": "title",
                    "value": "swwss",
                    "children": []
                },
                {
                    "label": "subtitle",
                    "value": "wsws",
                    "children": []
                },
                {
                    "label": "listItem0",
                    "value": "swswsw",
                    "children": []
                },
                {
                    "label": "listItem1",
                    "value": "wsswsw",
                    "children": []
                },
                {
                    "label": "listItem2",
                    "value": "swsw",
                    "children": []
                }
            ]
        },
        {
            "componentDocumentId": 3,
            "componentType": 1,
            "componentEntries": [
                {
                    "label": "title",
                    "value": "sw",
                    "children": []
                },
                {
                    "label": "text",
                    "value": "wssw",
                    "children": []
                }
            ]
        },
        {
            "componentDocumentId": 4,
            "componentType": 4,
            "componentEntries": [
                {
                    "label": "ProjectEntry0",
                    "value": null,
                    "children": [
                        {
                            "label": "title",
                            "value": "wswsw"
                        },
                        {
                            "label": "description",
                            "value": "wssw"
                        },
                        {
                            "label": "url",
                            "value": "wssw"
                        }
                    ]
                },
                {
                    "label": "ProjectEntry1",
                    "value": null,
                    "children": [
                        {
                            "label": "title",
                            "value": "swsw"
                        },
                        {
                            "label": "description",
                            "value": "wssw"
                        },
                        {
                            "label": "url",
                            "value": "wsswsw"
                        }
                    ]
                }
            ]
        },
        {
            "componentDocumentId": 5,
            "componentType": 5,
            "componentEntries": [
                {
                    "label": "phone",
                    "value": "swwssw",
                    "children": []
                },
                {
                    "label": "email",
                    "value": "wsswsw",
                    "children": []
                }
            ]
        }
    ]
}

  @ViewChild('parent', { static: true, read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  @ViewChild('profileCard')
  profileCardRef!: any;
  resumeData!: ResumeModel;
  profileData!: ResumeComponentModel;
  resumeId!: number;

  constructor(private route: ActivatedRoute, private resumeService: ResumeService, private router: Router) {}

  ngOnInit() {
    if(!this.route.snapshot.paramMap.get('id')) this.router.navigate(['/home']);
    this.resumeId = Number(this.route.snapshot.paramMap.get('id'));
    //this.resumeService.getResume(this.resumeId).subscribe(data => {
      this.resumeData = this.tempData;
      this.profileData = this.resumeData.components.find(c => c.componentType == WorkspaceItemType.ProfileCardElement) ?? <ResumeComponentModel>{};
    console.log(this.profileData);
      // });
    
      this.resumeData.components.map(c => {
        if(c.componentType !== WorkspaceItemType.ProfileCardElement){
          let workspaceItem = new ResumeViewItem(c.componentType);
        let componentType =  typeof(workspaceItem.component);
        const componentRef = this.viewContainerRef?.createComponent(workspaceItem.component);
        componentRef.setInput('componentData', c);
        } 
      });
  }
}
