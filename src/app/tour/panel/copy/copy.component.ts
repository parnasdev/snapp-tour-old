import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourApiService } from 'src/app/Core/Https/tour-api.service';
import { MessageService } from 'src/app/Core/Services/message.service';
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

  }

}
