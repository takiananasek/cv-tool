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
import { ResumeStore } from '../../../services/resume.store';

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
    private workspaceContext: WorkspaceContext) {}

  titleForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private store = inject(ResumeStore);

  ngOnInit(): void {
    this.titleForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
    });
    if(this.workspaceContext.isEdit){
      this.titleForm.patchValue({
        title: this.store.title()
      })
    }
  }

  onOkClick(): void {
    if (this.titleForm.valid) {
      this.store.updateTitle(this.titleForm.value.title);
      this.dialogRef.close('Ok');
    }
  }

  onCancelClick(): void {
    this.dialogRef.close('Cancel');
  }
}
