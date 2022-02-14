// The code in this file has been derived from the example code at XXXXXXXXXXXXXXXXXXX
// https://www.twilio.com/blog/transfer-files-data-javascript-applications-angular-node-js

// External Imports
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

// Internal Imports
import { datafileCluster } from '../models/datafile-types';
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
  private user: User;
 
  constructor(private moduleDataService: CoursePagesService, 
              private authenticationService: AuthenticationService,
              private datafilePageService: DatafilePageDataService, 
              private uploadDownloadService: FileUploadDownloadService,
              private clusterDialog: MatDialog, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Set up Routing.
    this.route.paramMap.subscribe(params => { 
      this.moduleId = params.get('moduleId') || ''; 
    });
    // Set up  other observers.
    this.authenticationService.user.subscribe(authenticatedUser => this.user = authenticatedUser); // Set up subscriptions.
    this.datafilePageService.datafileBoardData.subscribe(datafilePageData => this.Clusters = datafilePageData);

    this.getPageData();
  }

  public getPageData() {
    // Pass data to the service to process. This component shouldn't need to know how the service works. It justs needs to know service inputs and outputs.
    this.datafilePageService.getDatafileClusters(this.moduleId);
  }

  public download(fileId: number, fileName: string):  void {
    this.uploadDownloadService.downloadFile(fileId, this.moduleId, fileName); // Pass data to the service to process.
  }
 
  public remove(fileId: number):  void {
    this.uploadDownloadService.removeFile(fileId, this.moduleId);
  }

// Used to validate that the current user is a tutor. This prevents tutor only html elements being available to students
  public isUserTutor(): boolean {
    return this.user && this.user.role === Role.Tutor;
  }

  public createCluster() {
    // Configure the cluster dialog.
    const dialog = this.clusterDialog.open(ClusterDialogComponent, {
      width: '500px',
      height: '500px',
      data: {title: "", description: "", dialogTitle:"Create Cluster"}
    });
    
    // The cluster dialog shouldn't need to know what function to call when it closes. So pass in a function here instead.
    dialog.afterClosed().subscribe(result => {
      this.datafilePageService.createCluster(this.moduleId, result['title'], result['description']) // Pass data to the service to process.
    });
  }

  public editCluster(clusterId: number) {
    let cluster: datafileCluster = this.Clusters.find(x => x.clusterId == clusterId)

    // Configure the cluster dialog.
    const dialog = this.clusterDialog.open(ClusterDialogComponent, {
      width: '500px',
      height: '500px',
      data: {title: cluster.title, description: cluster.description, dialogTitle:"Edit Cluster"}
    });
    
    // The cluster dialog shouldn't need to know what function to call when it closes. So pass in a function here instead.
    dialog.afterClosed().subscribe(result => {
      this.datafilePageService.modifyCluster(this.moduleId, cluster.clusterId, result['title'], result['description']); // Pass data to the service to process.
    });
  }

  public deleteCluster(clusterId) {
    this.datafilePageService.removeCluster(this.moduleId, clusterId); // Pass data to the service to process.
  }
}
