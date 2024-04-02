import { Component } from '@angular/core';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-workspace-textfield-element',
  standalone: true,
  imports:  [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './workspace-textfield-element.component.html',
  styleUrl: './workspace-textfield-element.component.scss'
})
export class WorkspaceTextfieldElementComponent extends WorkspaceBaseElementComponent{

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(public workspaceContext: WorkspaceContext){
    super(workspaceContext);
  }
}
