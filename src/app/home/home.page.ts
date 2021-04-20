import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreviewService } from '../servicios/preview.service';
import { Preview } from '../clases/preview.class';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private previewSrv: PreviewService) {}

  preview: Preview = new Preview;

  perfil: string = "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg"

  ngOnInit(){
  }

  comentar(url){
    this.previewSrv.getPreview(url).subscribe((data: Preview) => {
      this.preview = data;
    });
    
  }
  
}
