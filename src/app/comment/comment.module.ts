import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { ListComponent } from './list/list.component';
import { StoreModule } from '../store/store.module';
import { CommentsPopupComponent } from './comments-popup/comments-popup.component';
import { AnswerCommentPopupComponent } from './answer-comment-popup/answer-comment-popup.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    CommentsPopupComponent,
    AnswerCommentPopupComponent
  ],
  imports: [
    CommonModule,
    CommentRoutingModule,
    ReactiveFormsModule,
    StoreModule
  ]
})
export class CommentModule { }
