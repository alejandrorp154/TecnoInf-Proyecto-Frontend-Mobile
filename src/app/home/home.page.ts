import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Usuario } from '../clases/usuario';
import { PageServiceService } from '../servicios/page-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public offset = 0
  public size = 10
  public usuarios

  constructor(private pageService: PageServiceService) {}
  
  ngOnInit() {
    this.usuarios = this.pageService.getAllUsersAsync(this.offset,this.size)
  }

  async loadData(event) {
      this.offset += 10
      const edge = this.usuarios.length * 0.10
      if(this.offset >= this.usuarios.length - edge) {
        const nextPageUser = this.pageService.getAllUsersAsync(this.offset,this.size)
        this.usuarios.push(...await nextPageUser)
      }
      event.target.complete();
  }

}
