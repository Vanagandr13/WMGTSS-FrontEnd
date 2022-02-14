// External Imports
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// Internal Imports
import { User, Role } from '../models/user-data-types';
import datafilePageData from './mock-datafile-data.json'; 
import { datafileCluster } from '../models/datafile-types';

// These services are mock services. They act as stand ins for real services during unit test.

class MockRouteParamMap {
  params: { [key: string]: string};

  constructor() {
    this.params  = { 'courseId': 'DTS', 'moduleId': 'WM300' };
  }
  
  public get(param: string) {
    return this.params[param];
  }
}

@Injectable({ providedIn: 'root', })
export class MockActiveRouteService {
  private paramMapSubject: BehaviorSubject<MockRouteParamMap>;
  public paramMap:  Observable<MockRouteParamMap>;

  constructor() {
    this.paramMapSubject = new BehaviorSubject<MockRouteParamMap>(new MockRouteParamMap());
    this.paramMap = this.paramMapSubject.asObservable();
  }
};

@Injectable({ providedIn: 'root', })
export class MockAuthService {
    private userSubject: BehaviorSubject<User>; 
    public user: Observable<User>;

    constructor() {
      // Set up observable
      this.userSubject = new BehaviorSubject<User>({
        id: 100,
        firstName: "Bob",
        lastName: "Mortimer",
        username: 'T100',
        role: Role.Tutor,
        token: 'fake-jwt-token,T100,Tutor'
      });
      this.user = this.userSubject.asObservable();
    }
};

@Injectable({ providedIn: 'root', })
export class MockDatafilePageService {
  private datafileBoardSubject: BehaviorSubject<datafileCluster[]>;
  public datafileBoardData: Observable<datafileCluster[]>;

  constructor() {
    // Set up observable
    this.datafileBoardSubject = new BehaviorSubject<datafileCluster[]>(datafilePageData.clusters);
    this.datafileBoardData = this.datafileBoardSubject.asObservable();
  }

  public getDatafileClusters(moduleId: string) {}
  public createCluster(moduleId: string, title: string, description: string) {}
  public modifyCluster(moduleId: string, clusterId: number, title: string, description: string) {}
  public removeCluster(moduleId: string, clusterId: number) {}
};

export class MockUploadDownloadService {
  public uploadFile(fileName: string, clusterId: Number, moduleId: string, fileContent: string): void {}
  public downloadFile(fileId: number, fileName: string): void {}
  public removeFile(fileId: number, moduleId: string): void {}
};




