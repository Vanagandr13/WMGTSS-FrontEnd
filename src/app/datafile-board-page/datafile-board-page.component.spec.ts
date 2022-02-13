// External Imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

// Internal Imports
import { DatafileBoardPageComponent } from './datafile-board-page.component';
import { FileUploadDownloadService } from '../services/file-upload-download-service';
import { DatafilePageDataService } from '../services/datafile-page-data-service';
import { AuthenticationService } from '../services/authentication-service';
import { CoursePagesService } from '../services/course-pages-service';
import { MockActiveRouteService, MockAuthService, MockDatafilePageService, MockUploadDownloadService } from '../tests/mock-services';
import datafilePageData from '../tests/mock-datafile-data.json';


describe('DatafileBoardPageComponent', () => {
  let component: DatafileBoardPageComponent;
  let fixture: ComponentFixture<DatafileBoardPageComponent>;

  const mockActivateRouteService = new MockActiveRouteService();
  const mockAuthService = new MockAuthService();
  const mockPageService = new MockDatafilePageService();
  const mockUploadDownloadService = new MockUploadDownloadService();

  const mockCoursePagesService = new CoursePagesService();
  mockCoursePagesService.getModule("DTS", "WM300");

  beforeEach(async() => {
  
    // service spies
    spyOn(mockPageService, 'getDatafileClusters');
    spyOn(mockPageService, 'removeCluster');

    spyOn(mockUploadDownloadService, 'downloadFile');
    spyOn(mockUploadDownloadService, 'removeFile');

    await TestBed.configureTestingModule({
      declarations: [ 
        DatafileBoardPageComponent,
      ],
      imports: [
      ],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: ActivatedRoute, useValue: mockActivateRouteService },
        { provide: AuthenticationService, useValue: mockAuthService },
        { provide: DatafilePageDataService, useValue: mockPageService },
        { provide: FileUploadDownloadService, useValue: mockUploadDownloadService },
        { provide: CoursePagesService, useValue: mockCoursePagesService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafileBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //-----Unit Tests-----//

  //-----Check Page-----//

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('page data should have been gathered', () => {
    expect(component).toBeTruthy();
    expect(mockPageService.getDatafileClusters).toHaveBeenCalled();
    expect(component.Clusters).toEqual(datafilePageData.clusters); // check that the data is correct
  });

  //-----Check Buttons-----//

  it('check that clicking the edit cluster button calls editCluster', async() => {
    const compiled = fixture.nativeElement as HTMLElement;
    spyOn(component, 'editCluster').and.callThrough();
    fixture.debugElement.nativeElement.querySelector('#edit-cluster').click();

    expect(component).toBeTruthy();
    expect(component.editCluster).toHaveBeenCalled();
  });

  it('check that clicking the create cluster button calls createCluster', async() => {
    const compiled = fixture.nativeElement as HTMLElement;
    spyOn(component, 'createCluster').and.callThrough();
    fixture.debugElement.nativeElement.querySelector('#create-cluster').click();

    expect(component).toBeTruthy();
    expect(component.createCluster).toHaveBeenCalled();
  });

  it('check that clicking the delete cluster button calls deleteCluster', async() => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.debugElement.nativeElement.querySelector('#delete-cluster').click();

    expect(component).toBeTruthy();
    expect(mockPageService.removeCluster).toHaveBeenCalled();
  });

  it('check that clicking the delete cluster button calls deleteCluster', async() => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.debugElement.nativeElement.querySelector('#delete-cluster').click();

    expect(component).toBeTruthy();
    expect(mockPageService.removeCluster).toHaveBeenCalled();
  });

  it('check that clicking the download file button calls downloadFile', async() => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.debugElement.nativeElement.querySelector('#download-file').click();

    expect(component).toBeTruthy();
    expect(mockUploadDownloadService.downloadFile).toHaveBeenCalled();
  });

  it('check that clicking the remove file button calls removeFile', async() => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.debugElement.nativeElement.querySelector('#remove-file').click();

    expect(component).toBeTruthy();
    expect(mockUploadDownloadService.removeFile).toHaveBeenCalled();
  });


});
