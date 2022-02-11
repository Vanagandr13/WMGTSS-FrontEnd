// The code in this file has been derived from the example code at
// https://www.twilio.com/blog/transfer-files-data-javascript-applications-angular-node-js


import { Component, OnInit } from '@angular/core';
import { DatafileStudentService } from '../services/datafile-student-service';
import { datafile, datafileBoard, datafileCluster } from '../../../../WMGTSS-BackEnd/src/DatafileTypes';// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
import { ActivatedRoute } from '@angular/router';
import { FileUploadDownloadService } from '../services/file-upload-download-service';
import { User } from '../models/user';
import { Role } from '../models/role';
import { AuthenticationService } from '../services/authentication-service';
import { CoursePagesService } from '../services/course-pages-service';


@Component({
  selector: 'app-datafile-board-page',
  templateUrl: './datafile-board-page.component.html',
  styleUrls: ['./datafile-board-page.component.css']
})
export class DatafileBoardPageComponent implements OnInit {
  Clusters: datafileCluster[] = [];
  moduleId: string = "";
  boardTitle: string = "";
  public fileInDownload: string;
  public percentage: number;
  public showProgress: boolean;
  public showDownloadError: boolean;
  public showUploadError: boolean;
  user: User;
 
  constructor(private ModuleDataService: CoursePagesService, private AuthenticationService: AuthenticationService, private StudentService: DatafileStudentService, private uploadDownloadService: FileUploadDownloadService, private route: ActivatedRoute) { }

  ngOnInit(): void { // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX remove unused file feilds from the page
    this.AuthenticationService.user.subscribe(authenticatedUser => this.user = authenticatedUser);
    this.StudentService.datafileBoardData.subscribe(datafilePageData => this.Clusters = datafilePageData);
    this.route.paramMap.subscribe(params => { 
      this.moduleId = params.get('moduleId') || ''; 
    });
    this.getPageData();
  }

  getPageData() {
    const moduleObject = this.ModuleDataService.getModule("DTS", this.moduleId);
    this.StudentService.getDatafileClusters(this.moduleId);
  }

  public download(fileId: number, fileName: string):  void {
    this.uploadDownloadService.downloadFile(fileId, fileName);
  }
 
  public remove(fileId: number):  void {
    this.uploadDownloadService.removeFile(fileId, this.moduleId);
  }

  public isUserTutor(): boolean {
    return this.user && this.user.role === Role.Tutor;
  }

  public createCluster() {} 
}
