import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadFileComponent} from "./upload-file/upload-file.component";
import {UploaderComponent} from "./uploader/uploader.component";
import {GetLatLongComponent} from "./get-lat-long/get-lat-long.component";
import {GetLocationComponent} from "./get-location/get-location.component";
import {TimePickerComponent} from './time-picker/time-picker.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UploadSingleComponent} from './upload-single/upload-single.component';
import {MultipleUploadComponent} from './multiple-upload/multiple-upload.component';
import {EditorComponent} from './editor/editor.component';
import {ToolsModule} from "../tools/tools/tools.module";
import {SelectCityComponent} from './select-city/select-city.component';
import {SelectHotelComponent} from './select-hotel/select-hotel.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AlertDialogComponent} from "./alert-dialog/alert-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ChipsComponent} from './chips/chips.component';


@NgModule({
  declarations: [
    UploadFileComponent,
    AlertDialogComponent,
    UploaderComponent,
    GetLatLongComponent,
    GetLocationComponent,
    TimePickerComponent,
    UploadSingleComponent,
    MultipleUploadComponent,
    EditorComponent,
    SelectCityComponent,
    SelectHotelComponent,
    ChipsComponent,
  ],
  exports: [
    UploadFileComponent,
    GetLocationComponent,
    TimePickerComponent,
    UploadSingleComponent,
    EditorComponent,
    SelectHotelComponent,
    SelectCityComponent,
    ChipsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule,

    ToolsModule,
  ], entryComponents: [UploadSingleComponent, AlertDialogComponent]
})
export class CommonProjectModule {
}
