import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservePopupComponent } from '../reserve-popup/reserve-popup.component';

@Component({
  selector: 'prs-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RulesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
