import { Component } from '@angular/core';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { ResumeComponentModel } from '../../../../models/resume.model';

@Component({
  selector: 'app-workspace-base-element',
  standalone: true,
  imports: [],
  templateUrl: './workspace-base-element.component.html',
  styleUrl: './workspace-base-element.component.scss'
})
export class WorkspaceBaseElementComponent {
  public unique_key!: number;
  public editData! : {id: number, model: ResumeComponentModel}

  constructor(workspaceContext: WorkspaceContext){
  }

}
