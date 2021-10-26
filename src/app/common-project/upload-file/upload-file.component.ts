import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UploaderComponent} from "../uploader/uploader.component";
import {MessageService} from "../../Core/Services/message.service";


@Component({
    selector: 'prs-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
    @Output() fileDTO = new EventEmitter();
    @Input() title = 'فایل خود را آپلود کنید';
    @Input() minSize = 0;
    @Input() maxSize = 5;

    constructor(public dialog: MatDialog,
                public message: MessageService) {}

    ngOnInit(): void {
    }


    uploadFile(Event: any): any {
        for (const event of Event.files) {
            const size = event.size / 1000 / 1000;
            if (size <= this.maxSize && size > this.minSize) {
                this.uploader(event);
            } else {
                this.uploadSizeInvalid(this.minSize, this.maxSize);
            }
        }
    }

    uploader(file: any): any {
        const dialog = this.dialog.open(UploaderComponent, {
            width: '30%',
            data: {
                file,
            }
        });
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.fileDTO.emit(result);
            }
        });
    }

    uploadSizeInvalid(min: any, max: any): any {
        if (min === 0) {
            this.message.custom(`فایل شما نمیتواند بیشتر از ${max}مگابایت باشد `);
        } else {
            this.message.custom(`فایل شما نمیتواند بیشتر از ${max}و کمتر از ${min} باشد`);

        }
    }
}
