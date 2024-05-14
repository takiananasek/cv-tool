import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { MatIconModule } from '@angular/material/icon';
import { WorkspaceItemType } from '../../../../models/workspaceItemType.model';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { FileInputType } from '../../../../models/fileInputType';
import { ResumeStore } from '../../../../services/resume.store';
import { ResumeComponentModel } from '../../../../models/resume.model';

@Component({
  selector: 'app-workspace-profile-card',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    FileUploadComponent,
  ],
  templateUrl: './workspace-profile-card.component.html',
  styleUrl: './workspace-profile-card.component.scss',
})
export class WorkspaceProfileCardComponent
  extends WorkspaceBaseElementComponent
  implements OnInit, OnChanges
{
  @Input() profileCardData!: ResumeComponentModel;
  fileName = '';
  profileForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  FileInputType = FileInputType;
  readonly store = inject(ResumeStore);

  get valid() {
    if (this.profileForm) {
      return this.profileForm.valid;
    }
    return false;
  }

  constructor(public workspaceContext: WorkspaceContext) {
    super(workspaceContext);
  }

  ngOnInit(): void {
    this.unique_key = 0;

    this.profileForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.onChanges();
    this.store.addComponent({
      componentDocumentId: 0,
      componentType: WorkspaceItemType.ProfileCardElement,
      componentEntries: []
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.workspaceContext.isEdit) {
      let name = this.workspaceContext.isEdit
        ? this.profileCardData?.componentEntries.find(
            (ce) => ce.label === 'name'
          )?.value
        : '';
      let jobTitle = this.workspaceContext.isEdit
        ? this.profileCardData?.componentEntries.find(
            (ce) => ce.label === 'jobTitle'
          )?.value
        : '';
      let description = this.workspaceContext.isEdit
        ? this.profileCardData?.componentEntries.find(
            (ce) => ce.label === 'description'
          )?.value
        : '';
      this.profileForm?.patchValue({
        name: name,
        jobTitle: jobTitle,
        description: description,
      });
    }
  }

  onChanges(): void {
    this.profileForm?.valueChanges.subscribe((val) => {
      if (this.profileForm.valid) {
        this.store.deleteComponent(this.unique_key);
        this.store.addComponent({
          componentDocumentId: this.unique_key,
          componentType: WorkspaceItemType.ProfileCardElement,
          componentEntries: [
            { label: 'name', value: val.name ?? '', children: [] },
            { label: 'jobTitle', value: val.jobTitle ?? '', children: [] },
            {
              label: 'description',
              value: val.description ?? '',
              children: [],
            },
          ],
        });
      }
    });
  }

  deleteElement(event: any) {
    this.store.deleteComponent(this.unique_key);
    this.workspaceContext.deleteElement(this.unique_key);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('thumbnail', file);
    }
  }
}
