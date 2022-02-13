// The code in this file has been derived from the example code at
// https://www.twilio.com/blog/transfer-files-data-javascript-applications-angular-node-js

// External Imports
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Internal Imports
import { FileUploadDownloadService } from '../services/file-upload-download-service';

@Component({
 selector: 'app-file-uploader',
 templateUrl: './file-upload.component.html',
 styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Input() public clusterId: Number;
  @Input() public moduleId: string;

 public formGroup = this.formBuilder.group({
   file: [null, Validators.required]
 });

 private fileName: string;

 constructor(private formBuilder: FormBuilder, private fileService: FileUploadDownloadService, private route: ActivatedRoute) { }

 public onFileChange(event) {
   const reader = new FileReader();

   if (event.target.files && event.target.files.length) {
     this.fileName = event.target.files[0].name;
     const [file] = event.target.files;
     reader.readAsDataURL(file);
    
     reader.onload = () => {
       this.formGroup.patchValue({
         file: reader.result
       });
     };
   }
 }

public onSubmit(): void {
   this.fileService.uploadFile(this.fileName, this.clusterId, this.moduleId, this.formGroup.get('file').value);
  }
}