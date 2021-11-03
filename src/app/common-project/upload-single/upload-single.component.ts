import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'prs-upload-single',
  templateUrl: './upload-single.component.html',
  styleUrls: ['./upload-single.component.scss']
})
export class UploadSingleComponent implements OnInit {

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
    form.value.content=(document.getElementById('context') as HTMLInputElement).value
    form.value.photo=null;
    if (this.testJSON((document.getElementById('photo') as HTMLInputElement).value)){
      form.value.photo=JSON.parse((document.getElementById('photo') as HTMLInputElement).value);
    }
    return this.http.post('http://127.0.0.1:8000/api/posts', JSON.stringify(form.value), {headers: this.headers})
      .toPromise()
      .then(function (res) {
        console.log(res)
        self.router.navigate(['/posts']);

      })
      .catch(this.handleError);
  }
  public loadScript(){
    var dynamicScripts=[
      'assets/js/custom/editor.js',
      'assets/js/custom/single-select.js',
    ];

    for (var index in dynamicScripts){
      var scripts=document.getElementsByTagName("script");
      for (var i=0;i<scripts.length;i++){
        // @ts-ignore
        if (scripts[i].getAttribute('src')!=null && scripts[i].getAttribute('src').includes(dynamicScripts[index])){
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
  public testJSON(text:string) {
    if (typeof text !== "string") {
      return false;
    }
    try {
      JSON.parse(text);
      return true;
    } catch (error) {
      return false;
    }
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
