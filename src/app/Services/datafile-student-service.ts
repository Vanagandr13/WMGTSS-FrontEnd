import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { datafile, datafileBoard, datafileCluster } from '../../../../WMGTSS-BackEnd/src/DatafileTypes'; // XXXXXXXXXXXXXXX I need to turn this into proper dependency

@Injectable()
export class DatafileStudentService {
  studentViewEndpoint: string;
  constructor(private http: HttpClient) {
      this.studentViewEndpoint = 'http://localhost:3000/api/datafile';
  }

  getDatafileStudentView() {
      return this.http.get<datafileBoard>(this.studentViewEndpoint);
  }
}