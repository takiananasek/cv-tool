import { Component, OnInit, inject } from '@angular/core';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { WorkspaceContext } from '../../../../services/workspace-context';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { WorkspaceItemType } from '../../../../models/workspaceItemType.model';
import { ResumeStore } from '../../../../services/resume.store';

@Component({
  selector: 'app-workspace-textfield-element',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './workspace-textfield-element.component.html',
  styleUrl: './workspace-textfield-element.component.scss',
})
export class WorkspaceTextfieldElementComponent
  extends WorkspaceBaseElementComponent
  implements OnInit
{
  textFieldForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  readonly store = inject(ResumeStore);

  constructor(public workspaceContext: WorkspaceContext) {
    super(workspaceContext);
  }

  get valid() {
    if (this.textFieldForm) {
      return this.textFieldForm.valid;
    }
    return false;
  }

  deleteElement(event: any) {
    this.store.deleteComponent(this.unique_key);
    this.workspaceContext.deleteElement(this.unique_key);
  }

  ngOnInit(): void {
    this.textFieldForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
    });
    this.onChanges();
  }

  onChanges(): void {
    this.textFieldForm.valueChanges.subscribe((val) => {
      if (this.textFieldForm.valid) {
        this.store.deleteComponent(this.unique_key);
        this.store.addComponent({
          componentDocumentId: this.unique_key,
          componentType: WorkspaceItemType.TextFieldElement,
          componentEntries: [
            { label: 'title', value: val.title, children: [] },
            { label: 'text', value: val.text, children: [] },
          ],
        });
      }
    });
  }
}
