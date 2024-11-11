import { Component, OnInit, inject } from '@angular/core';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-workspace-empty-element',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './workspace-empty-element.component.html',
  styleUrl: './workspace-empty-element.component.scss',
})
export class WorkspaceEmptyElementComponent
  extends WorkspaceBaseElementComponent
  implements OnInit
{
  constructor(public workspaceContext: WorkspaceContext) {
    super(workspaceContext);
  }

  ngOnInit(): void {}

  valid: boolean = true;

  deleteElement() {
    this.workspaceContext.deleteElement(this.unique_key);
  }
}
