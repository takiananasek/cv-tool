import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastService } from './toast.service';
import { map } from 'rxjs';
import { WorkspaceContext } from './workspace-context';
import { FileInputType } from '../models/fileInputType';
import { ResumeModel } from '../models/resume.model';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  constructor(private http: HttpClient, private toastService: ToastService, private workspaceContext: WorkspaceContext) {}
  serviceName = 'Files';

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
              this.workspaceContext.resume.update(r => <ResumeModel>{
                ownerId: r.ownerId,
                backgroundImageMetadataId: r.backgroundImageMetadataId,
                title: r.title,
                profileImageMetadataId: data.body.newId,
                components: [...r.components]
              })
              console.log(this.workspaceContext.resume())
              break;
            case FileInputType.Background: 
            this.workspaceContext.resume.update(r => <ResumeModel>{
              ownerId: r.ownerId,
              backgroundImageMetadataId: data.body.newId,
              title: r.title,
              profileImageMetadataId: r.profileImageMetadataId,
              components: [...r.components]
            })
            console.log(this.workspaceContext.resume())
              break;
          }
          this.toastService.success('Successfully uploaded image', '')
        }
      });
  }
}
