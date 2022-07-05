import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommentApiService } from 'src/app/Core/Https/comment-api.service';
import { CommentCreateDTO } from 'src/app/Core/Models/CommentDTO';
import { MessageService } from 'src/app/Core/Services/message.service';

@Component({
  selector: 'prs-answer-comment-popup',
  templateUrl: './answer-comment-popup.component.html',
  styleUrls: ['./answer-comment-popup.component.scss']
})
export class AnswerCommentPopupComponent implements OnInit {
  bodyFC = new FormControl('');
  rateFC = new FormControl();
  isLoading = false;
  req : CommentCreateDTO = {
    name: '',
    email: '',
    body: '',
    rate: 0,
  }
  constructor(public dialogRef: MatDialogRef<AnswerCommentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {cityID: number, id: number, type: string},
    public dialog: MatDialog,
    public api: CommentApiService,
    public message: MessageService,) {}

  ngOnInit(): void {
  }

  create():void {
    this.isLoading = true;
    this.setReq();
    this.api.createComment(this.req,this.data.cityID, this.data.type).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom('با موفقیت ثبت شد')
        this.dialogRef.close(true);
      } else {

      }
      this.isLoading = false;
    }, (error: any) => {
      this.isLoading = false;
      this.message.error()

    })
  }



  reply():void {
    this.isLoading = true;
    this.setReq();
    this.api.replyComment(this.req,this.data.cityID, this.data.id, this.data.type).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom('با موفقیت ثبت شد')
        this.dialogRef.close(true);
      } else {

      }
      this.isLoading = false;
    }, (error: any) => {
      this.isLoading = false;
      this.message.error()

    })
  }

  setReq():void {
    this.req = {
      name: '',
      email: '',
      body: this.bodyFC.value,
      rate: this.rateFC.value,
    }
  }

  submit():void {
    if(this.data.id) {
      this.reply()
    }else {
      this.create();
    }

  }

}
