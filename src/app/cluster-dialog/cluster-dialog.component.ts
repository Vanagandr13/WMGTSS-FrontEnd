import { Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-cluster-dialog',
  templateUrl: './cluster-dialog.component.html',
  styleUrls: ['./cluster-dialog.component.css']
})

export class ClusterDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<ClusterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, description: string, dialogTitle: string},
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialog.close();
  }
}
