import { Component, OnInit } from '@angular/core';
import {NgForm } from "@angular/forms";
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"

@Component({
  selector: 'app-gallery-create',
  templateUrl: './gallery-create.component.html',
  styleUrls: ['./gallery-create.component.css']
})
export class GalleryCreateComponent implements OnInit {
  loadAPI:Promise<any>;
  constructor(private http: HttpClient,private router: Router){
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

    return this.http.post('tour-api.parnasweb.com/api/galleries', JSON.stringify(form.value), {headers: this.headers})
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
}
