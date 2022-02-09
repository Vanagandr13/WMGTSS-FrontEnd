// External dependencies
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Internal dependencies
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ModulePageComponent } from './module-page/module-page.component';
import { DatafileBoardPageComponent } from './datafile-board-page/datafile-board-page.component';

import { DatafileStudentService } from './services/datafile-student-service';
import { FileUploadDownloadService } from './services/file-upload-download-service';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { JwtInterceptor } from './helpers/jwt-interceptor'; 
import { ErrorInterceptor } from './helpers/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    ModulePageComponent,
    DatafileBoardPageComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DatafileStudentService,
    FileUploadDownloadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
