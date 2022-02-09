import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { datafile, datafileBoard, datafileCluster } from '../../../../WMGTSS-BackEnd/src/DatafileTypes'; // XXXXXXXXXXXXXXX I need to turn this into proper dependency
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication-service';

@Injectable({
    providedIn: 'root',
})
export class DatafileStudentService {
  studentViewEndpoint: string;
  httpHeaders: HttpHeaders;
  user: User;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.studentViewEndpoint = environment.apiURL + '/api/datafile';
    this.authenticationService.user.subscribe(authenticatedUser => this.user = authenticatedUser);
    this.httpHeaders = new HttpHeaders().set('user-id', String(this.user.id))
                                        .set('user-role', this.user.role)
                                        .set('access-token', this.user.token);
  }

  getDatafileClusters(moduleId: string): Observable<datafileCluster[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("moduleId", moduleId)
    return this.http.get<datafileCluster[]>(this.studentViewEndpoint, {'headers': this.httpHeaders, params: queryParams})
      .pipe(
        catchError(this.handleError<datafileCluster[]>('getDatafileStudentView'))
      )
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