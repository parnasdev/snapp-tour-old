import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UploadFileComponent} from "./upload-file/upload-file.component";
import {UploaderComponent} from "./uploader/uploader.component";



@NgModule({
  declarations: [UploadFileComponent, UploaderComponent],
  exports: [
    UploadFileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommonProjectModule { }
