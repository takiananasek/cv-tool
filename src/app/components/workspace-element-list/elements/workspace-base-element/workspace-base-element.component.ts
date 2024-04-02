import { Component } from '@angular/core';
import { WorkspaceContext } from '../../../../services/workspace-context';

@Component({
  selector: 'app-workspace-base-element',
  standalone: true,
  imports: [],
  templateUrl: './workspace-base-element.component.html',
  styleUrl: './workspace-base-element.component.scss'
})
export class WorkspaceBaseElementComponent {
  public unique_key!: number;

  constructor(workspaceContext: WorkspaceContext){
  }
}
