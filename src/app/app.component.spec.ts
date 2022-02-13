//
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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
import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

// Internal dependencies
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ModulePageComponent } from './module-page/module-page.component';
import { DatafileBoardPageComponent } from './datafile-board-page/datafile-board-page.component';

import { DatafilePageDataService } from './services/datafile-page-data-service';
import { FileUploadDownloadService } from './services/file-upload-download-service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ClusterDialogComponent } from './cluster-dialog/cluster-dialog.component';

import { AuthenticationService } from './services/authentication-service';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
          HomePageComponent,
          LoginPageComponent,
          ModulePageComponent,
          DatafileBoardPageComponent,
          FileUploadComponent,
          ClusterDialogComponent
      ],
      imports: [
        RouterTestingModule,
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
        AuthenticationService,
        {provide: ActivatedRoute, useValue: {}}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'WMGTSS-FrontEnd'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('WMGTSS-FrontEnd');
  });

  it('should contain a banner, home and logout buttons', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#wmgtss-banner')).toBeTruthy(); // Check for a banner
    expect(compiled.querySelector('#home-button')).toBeTruthy(); // Check for a home button
    expect(compiled.querySelector('#logout-button')).toBeTruthy(); // Check for a logout button
  });
});
