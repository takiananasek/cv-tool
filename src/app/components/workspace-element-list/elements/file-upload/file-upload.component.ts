import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadService } from '../../../../services/file-upload.service';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { FileInputType } from '../../../../models/fileInputType';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatProgressBarModule, MatIconModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  @Input()
  requiredFileType!: string;
  @Input({required:true})
  fileInputType!: FileInputType;

  fileName = '';

  @ViewChild('input') input!: any;

  constructor(private fileService: FileUploadService, private workspaceContext: WorkspaceContext) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      this.fileService.uploadSingleFile(file, this.fileInputType);
    }
  }
}
