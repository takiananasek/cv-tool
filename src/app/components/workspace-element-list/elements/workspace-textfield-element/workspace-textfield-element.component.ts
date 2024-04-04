import { Component, OnInit, inject } from '@angular/core';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-workspace-textfield-element',
  standalone: true,
  imports:  [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './workspace-textfield-element.component.html',
  styleUrl: './workspace-textfield-element.component.scss'
})
export class WorkspaceTextfieldElementComponent extends WorkspaceBaseElementComponent implements OnInit {
  
  textFieldForm!: FormGroup;
  private formBuilder = inject(FormBuilder);

  constructor(public workspaceContext: WorkspaceContext){
    super(workspaceContext);
  }
  
  deleteElement(event: any){
    this.workspaceContext.deleteElement(this.unique_key);
  }

  ngOnInit(): void {
    this.textFieldForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required)
    });
  this.onChanges();
  }

  onChanges(): void {
    this.textFieldForm.valueChanges.subscribe(val => {
      this.workspaceContext.valid.update(() => true);
      if(this.textFieldForm.valid){
        //prepare data and update context
        console.log(val);
      }
      this.workspaceContext.valid.update((curr) => (curr && this.textFieldForm.valid));
    });
  }
}
