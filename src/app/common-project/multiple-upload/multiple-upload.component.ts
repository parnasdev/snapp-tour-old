import {Component, Inject, OnInit} from '@angular/core';
import {NgForm } from "@angular/forms";
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
@Component({
  selector: 'prs-multiple-upload',
  templateUrl: './multiple-upload.component.html',
  styleUrls: ['./multiple-upload.component.scss']
})
export class MultipleUploadComponent implements OnInit {
  loadAPI:Promise<any>;
  time = new Date().getTime();
  constructor(public dialogRef: MatDialogRef<MultipleUploadComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient,private router: Router){
    this.loadAPI=new Promise((resoleve)=>{
      this.loadScript();
      resoleve(true);
    });
  }
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    var  self=this;

    form.value.gallery=(document.getElementById('gallery') as HTMLInputElement).value;

    return this.http.post('https://tour-api.parnasweb.com/api/galleries', JSON.stringify(form.value), {headers: this.headers})
      .toPromise()
      .then(function (res) {
        console.log(res)
        self.router.navigate(['/galleries']);

      })
      .catch(this.handleError);
  }
  public loadScript(){
    var dynamicScripts=[
      'assets/js/custom/gallery.js',
    ];
    for (var index in dynamicScripts) {
      var scripts = document.getElementsByTagName("script");
      for (var i = 0; i < scripts.length; i++) {
        // @ts-ignore
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes(dynamicScripts[index])) {
          scripts[i].remove();
        }
      }
    }
    for (var i=0;i<dynamicScripts.length;i++){
      let node=document.createElement('script');
      node.src=dynamicScripts[i];
      node.async=false;
      document.getElementsByTagName('body')[0].appendChild(node);
    }
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  submit():void {
    // @ts-ignore
    const val = document.getElementById("gallery").value;
    console.log(val)
    this.dialogRef.close(JSON.parse(val))
  }
}
