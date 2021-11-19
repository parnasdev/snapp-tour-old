import { NgModule } from '@angular/core';
import {GalleryCreateComponent} from "./gallery-create/gallery-create.component";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FileManagerRoutingModule} from "./file-manager-routing.module";


@NgModule({
    declarations: [
        GalleryCreateComponent,
    ],
    imports: [
        CommonModule,
        FileManagerRoutingModule,
        FormsModule
    ],
    exports: [
        GalleryCreateComponent
    ]
})
export class FileManagerModule { }
