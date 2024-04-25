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

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  constructor(private http: HttpClient, private toastService: ToastService, private workspaceContext: WorkspaceContext) {}
  serviceName = 'Files';
  readonly store = inject(ResumeStore);
  
  uploadSingleFile(file: any, fileType: FileInputType) {
    let fileToUpload = <File>file;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post(`${environment.baseUrl}${this.serviceName}/upload/`, formData, {
        reportProgress: false,
        observe: 'events',
      }).subscribe((data:any) => {
        if(data.body){
          switch(fileType){
            case FileInputType.Profile:
              this.store.updateProfileIMageMetadataName(data.body.key);
              break;
            case FileInputType.Background: 
            this.store.updateBackgroundImageMetadataName(data.body.key)
              break;
          }
          this.toastService.success('Successfully uploaded image', '')
        }
      });
  }

  getResumeFile(fileId: any): Observable<any> {
    return this.http
      .post<any>(`${environment.baseUrl}${this.serviceName}/getFileById/`, fileId)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
