import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WorkspaceContext } from '../../../services/workspace-context';
import { ResumeModel } from '../../../models/resume.model';

@Component({
  selector: 'app-onsave-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './onsave-dialog.component.html',
  styleUrl: './onsave-dialog.component.scss',
})
export class OnsaveDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<OnsaveDialogComponent>,
    private workspaceContext: WorkspaceContext,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  titleForm!: FormGroup;
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.titleForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
    });
  }

  onOkClick(): void {
    if (this.titleForm.valid) {
      this.workspaceContext.resume.update(
        (r) =>
          <ResumeModel>{
            ownerId: r.ownerId,
            backgroundImageMetadataId: r.backgroundImageMetadataId,
            title: this.titleForm.value.title,
            profileImageMetadataId: r.profileImageMetadataId,
            components: [...r.components],
          }
      );
      this.dialogRef.close('Ok');
    }
  }

  onCancelClick(): void {
    this.dialogRef.close('Cancel');
  }
}
