import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadFileComponent} from "./upload-file/upload-file.component";
import {UploaderComponent} from "./uploader/uploader.component";
import {GetLatLongComponent} from "./get-lat-long/get-lat-long.component";
import {GetLocationComponent} from "./get-location/get-location.component";
import { TimePickerComponent } from './time-picker/time-picker.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [UploadFileComponent, UploaderComponent, GetLatLongComponent, GetLocationComponent, TimePickerComponent],
    exports: [
        UploadFileComponent,
        GetLocationComponent,
        TimePickerComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CommonProjectModule {
}