import { Component } from '@angular/core';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { WorkspaceElementListComponent } from '../../workspace-element-list.component';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workspace-title-element',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './workspace-title-element.component.html',
  styleUrl: './workspace-title-element.component.scss'
})
export class WorkspaceTitleElementComponent extends WorkspaceBaseElementComponent{

  constructor(public workspaceContext: WorkspaceContext){
    super(workspaceContext);
  }
  
  deleteElement(event: any){
    this.workspaceContext.deleteElement(this.unique_key);
  }
}
