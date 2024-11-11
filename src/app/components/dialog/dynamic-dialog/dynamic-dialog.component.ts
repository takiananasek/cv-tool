import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.scss'
})
export class DynamicDialogComponent {
  @Input() dialogContent: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, content: string}, public dialogRef: MatDialogRef<DynamicDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
