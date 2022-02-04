import { Component, OnInit } from '@angular/core';
import { DatafileStudentService } from '../services/datafile-student-service';
import { datafile, datafileBoard, datafileCluster } from '../../../../WMGTSS-BackEnd/src/DatafileTypes';// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datafile-board-page',
  templateUrl: './datafile-board-page.component.html',
  styleUrls: ['./datafile-board-page.component.css']
})
export class DatafileBoardPageComponent implements OnInit {
  Clusters: datafileCluster[] = [];
  moduleId: string = "";

  constructor(private StudentService: DatafileStudentService, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => { 
        this.moduleId = params.get('moduleId') || ''; 
      });
    this.getPageData();
  }

  getPageData() {
    this.StudentService.getDatafileClusters(this.moduleId).subscribe((clusters:datafileCluster[]) => this.Clusters = clusters)
  }

}
