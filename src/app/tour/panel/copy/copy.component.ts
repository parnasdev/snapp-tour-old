import {Component, OnInit} from '@angular/core';
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
    if (this.form.controls.title.value === this.info.title) {
      this.form.controls.title.setValue(this.info.title + '-کپی');
      this.form.controls.slug.setValue(this.form.value.title.split(' ').join('-'))

      this.form.controls.status.setValue('Draft');
    }
    this.convertTour();
    this.fillObj();
    this.call();
  }

}
