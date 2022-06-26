import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlertDialogComponent, AlertDialogDTO } from 'src/app/common-project/alert-dialog/alert-dialog.component';
import { CommentApiService } from 'src/app/Core/Https/comment-api.service';
import { CommentsDTO } from 'src/app/Core/Models/CommentDTO';
import { CalenderServices } from 'src/app/Core/Services/calender-service';
import { MessageService } from 'src/app/Core/Services/message.service';
import { AnswerCommentPopupComponent } from '../answer-comment-popup/answer-comment-popup.component';
import { CommentsPopupComponent } from '../comments-popup/comments-popup.component';

@Component({
  selector: 'prs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  comments: CommentsDTO[] = [];
  id: number = 0;
  isLoading = false;

  constructor(public api: CommentApiService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public message: MessageService,
    public calenderServices: CalenderServices) { }

  ngOnInit(): void {
    // @ts-ignore
    this.id = this.route.snapshot.paramMap.get('id');
    this.getComemnt();
  }


  getComemnt(): void {
    this.isLoading = true;
    this.api.getComments(true, this.id, 'city').subscribe((res: any) => {
      if (res.isDone) {
        this.comments = res.data;
      } else {

      }
      this.isLoading = false;
    }, (error: any) => {
      this.isLoading = false;

    })
  }

  deleteClicked(id: any) {
    const obj: AlertDialogDTO = {
      icon: '',
      title: 'اطمینان دارید؟',
      description: 'آیا حذف شود'
    }
    const dialog = this.dialog.open(AlertDialogComponent, {
      data: obj
    })
    dialog.afterClosed().subscribe((result: any) => {
      this.delete(id);
    })
  }


  delete(id: number): void {
    this.isLoading = true;
    this.api.deleteComment(id).subscribe((res: any) => {
      if (res.isDone) {
        this.message.custom('با موفقیت حذف شد')
        this.getComemnt()
      }
      this.isLoading = false;
    }, (error: any) => {
      this.isLoading = false;
      this.message.error();
    })
  }

  showChildren(comment:CommentsDTO):void {
    const dialog = this.dialog.open(CommentsPopupComponent, {
      data: comment
    })
    dialog.afterClosed().subscribe((result: any) => {
    
    })
  }


  changeStatus(id: number, status: number): void {    // 0 = unApproved      1 = Approved
    this.isLoading = true;
    this.api.changeStatus(status, id).subscribe((res: any) => {
      if (res.isDone) {
        this.getComemnt()
      }
      this.isLoading = false;
    }, (error: any) => {
      this.isLoading = false;
      this.message.error();
    })
  }


  reply(id:number = 0): void {
    const dialog = this.dialog.open(AnswerCommentPopupComponent, {
      width: '30%',
      data: {
        cityID: this.id,
        id: id,
        type: 'city'
      }
    })
    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getComemnt()
      }
    })
  }

}
