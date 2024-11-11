import {
  HttpClient,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastService } from './toast.service';
import { WorkspaceContext } from './workspace-context';
import { FileInputType } from '../models/fileInputType';
import { ResumeStore } from './resume.store';
import { Observable, map } from 'rxjs';

export interface UploadFileResponse{
  key:string,
  httpStatusCode: number;
}

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  constructor(private http: HttpClient, private toastService: ToastService, private workspaceContext: WorkspaceContext) {}
  serviceName = 'Files';
  readonly store = inject(ResumeStore);
  
  uploadSingleFile(file: File, fileType: FileInputType) {
    let fileToUpload = <File>file;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post<UploadFileResponse>(`${environment.baseUrl}${this.serviceName}/upload/`, formData)
      .subscribe((data: UploadFileResponse) => {
        if(data){
          switch(fileType){
            case FileInputType.Profile:
              this.store.updateProfileIMageMetadataName(data.key);
              break;
            case FileInputType.Background: 
            this.store.updateBackgroundImageMetadataName(data.key)
              break;
          }
          this.toastService.success('Successfully uploaded image', '')
        }
      });
  }
}
