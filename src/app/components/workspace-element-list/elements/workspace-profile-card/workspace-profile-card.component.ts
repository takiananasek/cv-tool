import { TextFieldModule } from '@angular/cdk/text-field';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';

@Component({
  selector: 'app-workspace-profile-card',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,TextFieldModule],
  templateUrl: './workspace-profile-card.component.html',
  styleUrl: './workspace-profile-card.component.scss'
})
export class WorkspaceProfileCardComponent extends WorkspaceBaseElementComponent{
}
