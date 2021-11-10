import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prs-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  loadAPI:Promise<any>;
  constructor() {
    this.loadAPI=new Promise((resoleve)=>{
      this.loadScript();
      resoleve(true);
    });
  }

  ngOnInit(): void {

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
