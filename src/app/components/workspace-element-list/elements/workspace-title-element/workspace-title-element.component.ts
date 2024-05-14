import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { WorkspaceItemType } from '../../../../models/workspaceItemType.model';
import { ResumeStore } from '../../../../services/resume.store';

@Component({
  selector: 'app-workspace-title-element',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './workspace-title-element.component.html',
  styleUrl: './workspace-title-element.component.scss',
})
export class WorkspaceTitleElementComponent
  extends WorkspaceBaseElementComponent
  implements OnInit
{
  titleForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  readonly store = inject(ResumeStore);

  get valid() {
    if (this.titleForm) {
      return this.titleForm.valid;
    }
    return false;
  }

  constructor(public workspaceContext: WorkspaceContext) {
    super(workspaceContext);
  }

  ngOnInit(): void {
    this.titleForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
    });
    this.store.addComponent({
      componentDocumentId: this.unique_key,
      componentType: WorkspaceItemType.TitleElement,
      componentEntries: [],
    });
    this.onChanges();
    if (this.workspaceContext.isEdit && this.editData) {
      let title = this.workspaceContext.isEdit
        ? this.editData.model.componentEntries.find(
            (ce) => ce.label === 'title'
          )?.value
        : '';
      this.titleForm?.patchValue({
        title: title,
      });
    }
  }

  onChanges(): void {
    this.titleForm.valueChanges.subscribe((val) => {
      if (this.titleForm.valid) {
        this.store.deleteComponent(this.unique_key);
        this.store.addComponent({
          componentDocumentId: this.unique_key,
          componentType: WorkspaceItemType.TitleElement,
          componentEntries: [
            { label: 'title', value: val.title, children: [] },
          ],
        });
      }
    });
  }

  deleteElement(event: any) {
    this.store.deleteComponent(this.unique_key);
    this.workspaceContext.deleteElement(this.unique_key);
  }
}
