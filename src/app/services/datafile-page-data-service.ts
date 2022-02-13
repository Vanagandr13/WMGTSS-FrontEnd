// External Imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';

// Internal Imports
import { datafileCluster } from '../../../../WMGTSS-BackEnd/src/DatafileTypes'; // In the final system these types will be made into aproper dependency
import { environment } from '../../environments/environment';
import { User } from '../models/user-data-types';
import { AuthenticationService } from './authentication-service';

@Injectable({
    providedIn: 'root',
})
export class DatafilePageDataService {
  private datafileBoardSubject: BehaviorSubject<datafileCluster[]>;
  public datafileBoardData: Observable<datafileCluster[]>;
  studentViewEndpoint: string;
  CreateClusterEndpoint: string;
  ModifyClusterEndpoint: string;
  RemoveClusterEndpoint: string;
  user: User;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.studentViewEndpoint = environment.apiURL + '/api/datafile';
    this.CreateClusterEndpoint = environment.apiURL + '/api/cluster/create';
    this.ModifyClusterEndpoint = environment.apiURL + '/api/cluster/modify';
    this.RemoveClusterEndpoint = environment.apiURL + '/api/cluster/delete';
    this.authenticationService.user.subscribe(authenticatedUser => this.user = authenticatedUser);
    this.datafileBoardSubject = new BehaviorSubject<datafileCluster[]>([]);
    this.datafileBoardData = this.datafileBoardSubject.asObservable();
  }

  createCluster(moduleId: string, title: string, description: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('accessToken', this.user.token);
    queryParams = queryParams.append("moduleId", moduleId);
    const body = {clusterTitle: title, clusterDescription: description};
    this.http.post(this.CreateClusterEndpoint, body, {params: queryParams})
    .subscribe(() => {
      // Get the updated page
      this.getDatafileClusters(moduleId);
    });  
  }

  modifyCluster(moduleId: string, clusterId: number, title: string, description: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('accessToken', this.user.token);
    queryParams = queryParams.append("clusterId", clusterId);
    const body = {clusterTitle: title, clusterDescription: description};
    this.http.put(this.ModifyClusterEndpoint, body, {params: queryParams})
    .subscribe(() => {
      // Get the updated page
      this.getDatafileClusters(moduleId);
    });  
  }

  removeCluster(moduleId: string, clusterId: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('accessToken', this.user.token);
    queryParams = queryParams.append("clusterId", clusterId);
    this.http.delete(this.RemoveClusterEndpoint, {params: queryParams})
    .subscribe(() => {
      // Get the updated page
      this.getDatafileClusters(moduleId);
    });  
  }

  getDatafileClusters(moduleId: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('accessToken', this.user.token);
    queryParams = queryParams.append("moduleId", moduleId);
    this.http.get<datafileCluster[]>(this.studentViewEndpoint, {params: queryParams})
    .pipe(
      catchError(this.handleError<datafileCluster[]>('getDatafileStudentView'))
    ).subscribe(response => { 
      this.datafileBoardSubject.next(response);

    });
      
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
  
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}