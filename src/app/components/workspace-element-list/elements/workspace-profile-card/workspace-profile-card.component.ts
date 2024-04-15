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

    this.workspaceContext.resume.update(
      (r) =>
        <ResumeModel>{
          ownerId: r.ownerId,
              title: r.title,
              backgroundImageMetadataId: r.backgroundImageMetadataId,
              profileImageMetadataId: r.profileImageMetadataId,
          components: [
            ...r.components.filter(
              (c) => c.componentDocumentId !== this.unique_key
            ),
            {
              componentDocumentId: 0,
              componentType: WorkspaceItemType.ProfileCardElement,
              componentEntries: [],
              children: [],
            },
          ],
        }
    );

    this.onChanges();
  }

  onChanges(): void {
    this.profileForm.valueChanges.subscribe((val) => {
      if (this.profileForm.valid) {
        this.workspaceContext.resume.update(
          (r) =>
            <ResumeModel>{
              ownerId: r.ownerId,
              components: [
                ...r.components.filter(
                  (c) => c.componentDocumentId !== this.unique_key
                ),
                {
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
                },
              ],
            }
        );
      }
    });
  }

  deleteElement(event: any) {
    this.workspaceContext.resume.update(
      (r) =>
        <ResumeModel>{
          ownerId: r.ownerId,
          components: r.components.filter(
            (x) => x.componentDocumentId !== this.unique_key
          ),
        }
    );
    this.workspaceContext.deleteElement(this.unique_key);
  }

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        //const upload$ = this.http.post("/api/thumbnail-upload", formData);

        //upload$.subscribe();
    }
}
}
