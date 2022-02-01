import { Component, OnInit } from '@angular/core';
import json from '../../assets/test-data/test-datafiles.json';
import { DatafileStudentService } from '../Services/datafile-student-service';
import { datafile, datafileBoard, datafileCluster } from '../../../../WMGTSS-BackEnd/src/DatafileTypes';// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

@Component({
  selector: 'app-datafile-board-page',
  templateUrl: './datafile-board-page.component.html',
  styleUrls: ['./datafile-board-page.component.css']
})
export class DatafileBoardPageComponent implements OnInit {
  Clusters: datafileCluster[] = [];
  DatafilePageData: datafileBoard = {boardTitle: "", clusters: new Map<number, datafileCluster>()};

  constructor(private StudentService: DatafileStudentService) { }

  ngOnInit(): void {
    this.getPageData();
  }

  getPageData() {
    this.StudentService.getDatafileStudentView().subscribe((data: datafileBoard) => this.DatafilePageData = { ...data})
    for (let cluster of this.DatafilePageData.clusters.values())
    {
      this.Clusters.push(cluster);
    }
  }

}
