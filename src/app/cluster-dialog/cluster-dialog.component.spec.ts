// Cluster Dialog Unit Tests

// External Imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Internal Imports
import { ClusterDialogComponent } from './cluster-dialog.component';

describe('ClusterDialogComponent', () => {
  let component: ClusterDialogComponent;
  let fixture: ComponentFixture<ClusterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterDialogComponent ],
      imports: [],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dialog', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a title entry box', () => {
    const fixture = TestBed.createComponent(ClusterDialogComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#title-entry-box')).toBeTruthy(); // Check for a title entry box
  });

  it('should contain a description entry box', () => {
    const fixture = TestBed.createComponent(ClusterDialogComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#description-entry-box')).toBeTruthy(); // Check for a description entry box

  });

  it('should contain a submit button', () => {
    const fixture = TestBed.createComponent(ClusterDialogComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#submit-button')).toBeTruthy(); // Check for a submit button

  });

  it('should contain a cancel button', () => {
    const fixture = TestBed.createComponent(ClusterDialogComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#cancel-button')).toBeTruthy(); // Check for a cancel button
  });
});
