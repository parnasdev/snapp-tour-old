import { Component, OnInit } from '@angular/core';
import {EditComponent} from "../edit/edit.component";

@Component({
  selector: 'prs-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss']
})
export class CopyComponent extends EditComponent implements OnInit {


  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getInfo()
  }
  submit() {
    this.convertTour();
    this.fillObj();
    this.call();
  }
}
