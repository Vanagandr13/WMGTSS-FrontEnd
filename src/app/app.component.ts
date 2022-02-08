import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadDownloadService } from './services/file-upload-download-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WMGTSS-FrontEnd';

  public displayLoader: Observable<boolean> = this.fileService.isLoading();

  constructor(private fileService: FileUploadDownloadService) {}
}
