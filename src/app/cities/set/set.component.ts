import {Component, OnInit} from '@angular/core';
import {CityApiService} from "../../Core/Https/city-api.service";
import {MessageService} from "../../Core/Services/message.service";
import {CitySetRequestDTO} from "../../Core/Models/cityDTO";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MultipleUploadComponent} from "../../common-project/multiple-upload/multiple-upload.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'prs-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {
  req: CitySetRequestDTO = {
    description: '',
    images: [],
    name: '',
    nameEn: '',
    type: false
  }
  nameFC = new FormControl();
  nameEnFC = new FormControl();
  desFC = new FormControl();
  isLoading = false;
  images: any[] = [];
  typeFC = new FormControl(true);
  city: string | null = '';
  info!: CitySetRequestDTO;

  constructor(public api: CityApiService,
              public dialog: MatDialog,
              public router: Router,
              public route: ActivatedRoute,
              public message: MessageService) {
  }

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('city')
    console.log(this.city)
    this.getInfo();
  }


  submit(): void {
    if (this.city) {
      this.setReq()
      this.isLoading = true;
      this.api.edit(this.req,this.city).subscribe((res: any) => {
        this.isLoading = false;
        if (res.isDone) {
          this.message.custom(res.message);
          this.router.navigateByUrl('/panel/cities')
        }
      }, (error: any) => {
        this.isLoading = false;
      })
    }else {
      this.setReq()
      this.isLoading = true;
      this.api.add(this.req).subscribe((res: any) => {
        this.isLoading = false;
        if (res.isDone) {
          this.message.custom(res.message);
          this.router.navigateByUrl('/panel/cities')
        }
      }, (error: any) => {
        this.isLoading = false;
      })
    }

  }

  setValue(): void {
    this.nameFC.setValue(this.info.name)
    this.nameEnFC.setValue(this.info.nameEn)
    this.desFC.setValue(this.info.description)
    this.images = this.info.images
    this.typeFC.setValue(this.info.type);
  }

  setReq(): void {
    this.req = {
      description: this.desFC.value,
      images: this.images,
      name: this.nameFC.value,
      nameEn: this.nameEnFC.value,
      type: this.typeFC.value
    }
  }

  getInfo(): void {
    if (this.city) {
      this.api.getCity(this.city).subscribe((res: any) => {
        if (res.isDone) {
          this.info = res.data;
          this.setValue();
        }
      }, (error: any) => {
        this.message.error()
      })
    }
  }


  getImages(): void {
    const dialog = this.dialog.open(MultipleUploadComponent, {});
    dialog.afterClosed().subscribe((result: any[]) => {
      result.forEach(x => {
        this.images.push(x.path);
      })

    })
  }

  removeImage(index: any): void {
    this.images.splice(index, -1);
  }
}
