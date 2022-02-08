// The code in this file has been derived from the example code at
// https://www.twilio.com/blog/transfer-files-data-javascript-applications-angular-node-js


import { Component, OnInit } from '@angular/core';
import { DatafileStudentService } from '../services/datafile-student-service';
import { datafile, datafileBoard, datafileCluster } from '../../../../WMGTSS-BackEnd/src/DatafileTypes';// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
import { ActivatedRoute } from '@angular/router';
import { FileUploadDownloadService } from '../services/file-upload-download-service';


@Component({
  selector: 'app-datafile-board-page',
  templateUrl: './datafile-board-page.component.html',
  styleUrls: ['./datafile-board-page.component.css']
})
export class DatafileBoardPageComponent implements OnInit {
  Clusters: datafileCluster[] = [];
  moduleId: string = "";
  public fileInDownload: string;
  public percentage: number;
  public showProgress: boolean;
  public showDownloadError: boolean;
  public showUploadError: boolean;
 
  constructor(private StudentService: DatafileStudentService, private uploadDownloadService: FileUploadDownloadService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => { 
        this.moduleId = params.get('moduleId') || ''; 
      });
    this.getPageData();
  }

  getPageData() {
    this.StudentService.getDatafileClusters(this.moduleId).subscribe((clusters:datafileCluster[]) => this.Clusters = clusters)
  }

  public download(fileId: number, fileName: string):  void {
    this.uploadDownloadService.download(fileId, fileName);
  }
 
  public remove(fileId: number):  void {
    this.uploadDownloadService.remove(fileId);
  }
}
