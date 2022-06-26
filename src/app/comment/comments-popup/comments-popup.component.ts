import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommentApiService } from 'src/app/Core/Https/comment-api.service';
import { CommentsDTO } from 'src/app/Core/Models/CommentDTO';
import { MessageService } from 'src/app/Core/Services/message.service';
@Component({
  selector: 'prs-comments-popup',
  templateUrl: './comments-popup.component.html',
  styleUrls: ['./comments-popup.component.scss']
})
export class CommentsPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CommentsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommentsDTO,
    public dialog: MatDialog,
    public api: CommentApiService,
    public message: MessageService,) {}

  ngOnInit(): void {
  }

}
