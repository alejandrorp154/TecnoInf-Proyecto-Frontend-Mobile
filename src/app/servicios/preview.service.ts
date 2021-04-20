import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  constructor(public httpClient: HttpClient) { }

  getPreview (url: string){
    return this.httpClient.get('http://api.linkpreview.net/?key=3f5c001d3973bdc74456aea7e1464340&q='+url);
  }
}
