import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InvalidFormDialogComponent } from '../invalid-form-dialog/invalid-form-dialog.component';

@Component({
  selector: 'app-onsave-dialog',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './onsave-dialog.component.html',
  styleUrl: './onsave-dialog.component.scss'
})
export class OnsaveDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<InvalidFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onOkClick(): void {
    this.dialogRef.close('Ok');
  }

  onCancelClick(): void {
    this.dialogRef.close('Cancel');
  }
}
