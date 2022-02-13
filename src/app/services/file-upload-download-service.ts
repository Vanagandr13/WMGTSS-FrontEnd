// The code in this file has been derived from the example code at
// https://www.twilio.com/blog/transfer-files-data-javascript-applications-angular-node-js

// External Imports
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

// Internal Imports
import { environment } from '../../environments/environment';
import { User } from '../models/user-data-types';
import { AuthenticationService } from '../services/authentication-service';
import { DatafilePageDataService } from './datafile-page-data-service';


@Injectable({
 providedIn: 'root'
})
export class FileUploadDownloadService {
  dataFileBackendURL: string;
  user: User;

  private displayLoader$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private datafilePageDataService: DatafilePageDataService) {
    this.authenticationService.user.subscribe(authenticatedUser => this.user = authenticatedUser);
    this.dataFileBackendURL = environment.apiURL + '/api';
   }
 
  public isLoading(): Observable<boolean> {
    return this.displayLoader$;
  }
 
  public uploadFile(fileName: string, clusterId: Number, moduleId: string, fileContent: string): void {
    this.displayLoader$.next(true);
    let queryParams = new HttpParams();
    queryParams = queryParams.append('accessToken', this.user.token);
    const body = {name: fileName, clusterId: clusterId, content: fileContent};
    this.http.put(this.dataFileBackendURL + '/file/upload', body, {params:queryParams})
    .subscribe(() => {
      // Get the updated page
      this.datafilePageDataService.getDatafileClusters(moduleId);
    });
  }
 
  public downloadFile(fileId: number, moduleId: string, fileName: string): void {
    let queryParams = new HttpParams();
    let fileType = fileName.split('.').pop()
    queryParams = queryParams.append('accessToken', this.user.token);
    queryParams = queryParams.append("fileId", fileId);
    this.http.get(this.dataFileBackendURL + '/file/download', {params: queryParams, observe: 'response', responseType: 'blob'}).subscribe(response => {
      const blob: Blob = new Blob([response.body], {type: fileType});
      const objectUrl: string = URL.createObjectURL(blob);
      const anchor: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

      anchor.href = objectUrl;
      anchor.download = fileName;
      anchor.click();
      URL.revokeObjectURL(objectUrl);

      this.datafilePageDataService.getDatafileClusters(moduleId); 
    });
  }
 
  public removeFile(fileId: number, moduleId: string): void {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('accessToken', this.user.token);
    queryParams = queryParams.append("fileId", fileId);
    this.http.delete(this.dataFileBackendURL + '/file/delete', {params: queryParams}).subscribe(() => {
      // Get the updated page
      this.datafilePageDataService.getDatafileClusters(moduleId); 
    });
  }
}