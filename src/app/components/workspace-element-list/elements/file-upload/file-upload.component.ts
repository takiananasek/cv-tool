import {
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadService } from '../../../../services/file-upload.service';
import { FileInputType } from '../../../../models/fileInputType';
import { WorkspaceContext } from '../../../../services/workspace-context';

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
  @Input({ required: true })
  fileInputType!: FileInputType;

  @ViewChild('input') input!: any;

  constructor(
    private fileService: FileUploadService,
    private workspaceContext: WorkspaceContext
  ) {}

  getFileName() {
    if (this.fileInputType == FileInputType.Profile) {
      return this.workspaceContext.profileImageMetadataName();
    } else {
      return this.workspaceContext.backgroundImageMetadataName();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.fileService.uploadSingleFile(file, this.fileInputType);
    }
  }
}
