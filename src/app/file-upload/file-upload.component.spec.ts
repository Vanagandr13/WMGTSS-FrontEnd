// File Upload Component Unit Tests

// External Imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Internal Imports
import { FileUploadDownloadService } from '../services/file-upload-download-service';
import { MockUploadDownloadService } from '../tests/mock-services';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  const mockUploadDownloadService = new MockUploadDownloadService();

  beforeEach(async() => {
  
    // service spies
    spyOn(mockUploadDownloadService, 'uploadFile');

    await TestBed.configureTestingModule({
      declarations: [
        FileUploadComponent 
      ],
      imports: [ 
        ReactiveFormsModule
      ],
      providers:[
        { provide: ActivatedRoute, useValue: {} },
        { provide: FileUploadDownloadService, useValue: mockUploadDownloadService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
