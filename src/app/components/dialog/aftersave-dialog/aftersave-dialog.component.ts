import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../environments/environment';
import { ClipboardModule, ClipboardService } from 'ngx-clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aftersave-dialog',
  standalone: true,
  imports: [MatIconModule, ClipboardModule],
  templateUrl: './aftersave-dialog.component.html',
  styleUrl: './aftersave-dialog.component.scss'
})
export class AftersaveDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AftersaveDialogComponent>,
    private clipboardApi: ClipboardService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  openResume(): void {
    let url = environment.redirectUri + 'resume?id=' + this.data.id;
    window.open(url, '_blank');
  }

  copyLinkToClipboard(): void {
    let url = environment.redirectUri + 'resume?id=' + this.data.id;
    this.clipboardApi.copyFromContent(url);
  }

  navigateToDashboard(){
    this.router.navigate(['/dashboard']);
    this.dialogRef.close();
  }
}
