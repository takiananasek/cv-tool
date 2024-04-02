import { Component } from '@angular/core';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workspace-project-links',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './workspace-project-links.component.html',
  styleUrl: './workspace-project-links.component.scss',
})
export class WorkspaceProjectLinksComponent extends WorkspaceBaseElementComponent {
  listItems: { id: number; title: string, description: string, url: string }[] = [];
  ID_COUNTER: number = 0;

  constructor(public workspaceContext: WorkspaceContext) {
    super(workspaceContext);
  }

  addItem() {
    this.listItems.push({
      id: this.ID_COUNTER,
      title: '',
      description: '',
      url: ''
    });
    this.ID_COUNTER++;
  }

  deleteItem(item: { id: number; title: string, description: string, url: string }) {
    this.listItems = this.listItems.filter((li) => li.id !== item.id);
    this.ID_COUNTER--;
  }
}
