// The code in this file has been derived from the example code at XXXXXXXXXXXXXXXXXXX
// https://www.twilio.com/blog/transfer-files-data-javascript-applications-angular-node-js

// External Imports
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

// Internal Imports
import { datafileCluster } from '../models/DatafileTypes';
import { FileUploadDownloadService } from '../services/file-upload-download-service';
import { User, Role } from '../models/user-data-types';
import { DatafilePageDataService } from '../services/datafile-page-data-service';
import { AuthenticationService } from '../services/authentication-service';
import { CoursePagesService } from '../services/course-pages-service';
import { ClusterDialogComponent } from '../cluster-dialog/cluster-dialog.component';

@Component({
  selector: 'app-datafile-board-page',
  templateUrl: './datafile-board-page.component.html',
  styleUrls: ['./datafile-board-page.component.css']
})

export class DatafileBoardPageComponent implements OnInit {
  public Clusters: datafileCluster[] = [];
  public moduleId: string = "";
  public fileInDownload: string;
  public percentage: number;
  public showProgress: boolean;
  public showDownloadError: boolean;
  public showUploadError: boolean;
  user: User;
 
  constructor(private moduleDataService: CoursePagesService, 
              private authenticationService: AuthenticationService,
              private datafilePageService: DatafilePageDataService, 
              private uploadDownloadService: FileUploadDownloadService,
              private clusterDialog: MatDialog, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.moduleId = params.get('moduleId') || ''; 
    });
    this.authenticationService.user.subscribe(authenticatedUser => this.user = authenticatedUser);
    this.datafilePageService.datafileBoardData.subscribe(datafilePageData => this.Clusters = datafilePageData);

    this.getPageData();
  }

  public getPageData() {
    this.datafilePageService.getDatafileClusters(this.moduleId);
  }

  public download(fileId: number, fileName: string):  void {
    this.uploadDownloadService.downloadFile(fileId, this.moduleId, fileName);
  }
 
  public remove(fileId: number):  void {
    this.uploadDownloadService.removeFile(fileId, this.moduleId);
  }

  public isUserTutor(): boolean {
    return this.user && this.user.role === Role.Tutor;
  }

  public createCluster() {
    const dialog = this.clusterDialog.open(ClusterDialogComponent, {
      width: '500px',
      height: '500px',
      data: {title: "", description: "", dialogTitle:"Create Cluster"}
    });
  
    dialog.afterClosed().subscribe(result => {
      this.datafilePageService.createCluster(this.moduleId, result['title'], result['description'])
    });
  }

  public editCluster(clusterId) {
    let cluster: datafileCluster = this.Clusters.find(x => x.clusterId == clusterId)

    const dialog = this.clusterDialog.open(ClusterDialogComponent, {
      width: '500px',
      height: '500px',
      data: {title: cluster.title, description: cluster.description, dialogTitle:"Edit Cluster"}
    });
  
    dialog.afterClosed().subscribe(result => {
      this.datafilePageService.modifyCluster(this.moduleId, cluster.clusterId, result['title'], result['description']);
    });
  }

  public deleteCluster(clusterId) {
    this.datafilePageService.removeCluster(this.moduleId, clusterId);
  }
}
