import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadFileComponent} from "./upload-file/upload-file.component";
import {UploaderComponent} from "./uploader/uploader.component";
import {GetLatLongComponent} from "./get-lat-long/get-lat-long.component";
import {GetLocationComponent} from "./get-location/get-location.component";
import { TimePickerComponent } from './time-picker/time-picker.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UploadSingleComponent } from './upload-single/upload-single.component';
import { MultipleUploadComponent } from './multiple-upload/multiple-upload.component';
import { EditorComponent } from './editor/editor.component';


@NgModule({
  declarations: [UploadFileComponent, UploaderComponent, GetLatLongComponent, GetLocationComponent, TimePickerComponent, UploadSingleComponent, MultipleUploadComponent, EditorComponent],
    exports: [
        UploadFileComponent,
        GetLocationComponent,
        TimePickerComponent,
        UploadSingleComponent,
      EditorComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],entryComponents: [UploadSingleComponent]
})
export class CommonProjectModule {
}
