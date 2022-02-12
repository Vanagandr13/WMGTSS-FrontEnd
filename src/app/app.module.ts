// External dependencies
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Internal dependencies
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ModulePageComponent } from './module-page/module-page.component';
import { DatafileBoardPageComponent } from './datafile-board-page/datafile-board-page.component';

import { DatafilePageDataService } from './services/datafile-page-data-service';
import { FileUploadDownloadService } from './services/file-upload-download-service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ClusterDialogComponent } from './cluster-dialog/cluster-dialog.component';

import { AuthenticationService } from './services/authentication-service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    ModulePageComponent,
    DatafileBoardPageComponent,
    FileUploadComponent,
    ClusterDialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule

  ],
  providers: [
    DatafilePageDataService,
    FileUploadDownloadService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
