import { Component } from '@angular/core';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-workspace-contact-element',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './workspace-contact-element.component.html',
  styleUrl: './workspace-contact-element.component.scss',
})
export class WorkspaceContactElementComponent extends WorkspaceBaseElementComponent {
  constructor(public workspaceContext: WorkspaceContext) {
    super(workspaceContext);
  }
}
