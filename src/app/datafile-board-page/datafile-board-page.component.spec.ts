import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafileBoardPageComponent } from './datafile-board-page.component';

describe('DatafileBoardPageComponent', () => {
  let component: DatafileBoardPageComponent;
  let fixture: ComponentFixture<DatafileBoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatafileBoardPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafileBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
