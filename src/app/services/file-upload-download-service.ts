// The code in this file has been derived from the example code at
// https://www.twilio.com/blog/transfer-files-data-javascript-applications-angular-node-js

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable({
 providedIn: 'root'
})
export class FileUploadDownloadService {
  dataFileBackendURL: string;

  private displayLoader$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.dataFileBackendURL = 'http://localhost:3000/api';
   }
 
  public isLoading(): Observable<boolean> {
    return this.displayLoader$;
  }
 
  public upload(fileName: string, clusterId: Number, fileContent: string): void {
    this.displayLoader$.next(true);
    const body = {name: fileName, clusterId: clusterId, content: fileContent};
    this.http.put(this.dataFileBackendURL + '/file/upload', body)
    .pipe(finalize(() => this.displayLoader$.next(false)))
    .subscribe(res => {
    }, error => {
      this.displayLoader$.next(false);
    });
  }
 
  public download(fileId: number, fileName: string): void {
    let queryParams = new HttpParams();
    let fileType = fileName.split('.').pop()
    queryParams = queryParams.append("fileId", fileId);
    this.http.get(this.dataFileBackendURL + '/file/download', {params: queryParams, observe: 'response', responseType: 'blob'}).subscribe(response => {
      //let downloadURL = window.open(window.URL.createObjectURL(response));
      //saveAs(downloadURL);
      const blob: Blob = new Blob([response.body], {type: fileType});
      const objectUrl: string = URL.createObjectURL(blob);
      const anchor: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;


      anchor.href = objectUrl;
      anchor.download = fileName;
      //document.body.appendChild(a);
      anchor.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
 
  public remove(fileId: number): void {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("fileId", fileId)
    this.http.delete(this.dataFileBackendURL + '/file/delete', {params: queryParams}).subscribe(() => { 
    });
  }
 
}