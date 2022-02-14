// External Imports
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

// Internal Imports
import { FileUploadDownloadService } from './services/file-upload-download-service';
import { AuthenticationService } from './services/authentication-service';
import { User, Role } from './models/user-data-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WMGTSS-FrontEnd';
  user: User;

  public displayLoader: Observable<boolean> = this.fileService.isLoading();

  constructor(private fileService: FileUploadDownloadService, private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(authenticatedUser => this.user = authenticatedUser); // Set up subscriptions.
  }

  get isTutor() {
    return this.user && this.user.role === Role.Tutor;
}

logout() {
    this.authenticationService.logout();
}

}
