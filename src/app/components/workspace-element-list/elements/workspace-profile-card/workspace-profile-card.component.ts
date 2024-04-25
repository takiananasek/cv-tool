import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, OnInit, inject } from '@angular/core';
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
import { ResumeModel } from '../../../../models/resume.model';
import { WorkspaceItemType } from '../../../../models/workspaceItemType.model';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { FileInputType } from '../../../../models/fileInputType';
import { ResumeStore } from '../../../../services/resume.store';

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
    FileUploadComponent
  ],
  templateUrl: './workspace-profile-card.component.html',
  styleUrl: './workspace-profile-card.component.scss',
})
export class WorkspaceProfileCardComponent
  extends WorkspaceBaseElementComponent
  implements OnInit
{
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

    this.store.addComponent({
      componentDocumentId: 0,
      componentType: WorkspaceItemType.ProfileCardElement,
      componentEntries: []
    })
    this.onChanges();
  }

  onChanges(): void {
    this.profileForm.valueChanges.subscribe((val) => {
      if (this.profileForm.valid) {
        this.store.deleteComponent(this.unique_key);
        this.store.addComponent({
          componentDocumentId: this.unique_key,
          componentType: WorkspaceItemType.ProfileCardElement,
          componentEntries: [
            { label: 'name', value: val.name, children: [] },
            { label: 'jobTitle', value: val.jobTitle, children: [] },
            {
              label: 'description',
              value: val.description,
              children: [],
            },
          ],
        },);
      }
    });
  }

  deleteElement(event: any) {
    this.store.deleteComponent(this.unique_key);
    this.workspaceContext.deleteElement(this.unique_key);
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);
    }
}
}
