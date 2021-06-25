import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-galeria-modal',
  templateUrl: './galeria-modal.page.html',
  styleUrls: ['./galeria-modal.page.scss'],
})
export class GaleriaModalPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  @Input('img') img: any;
  sliderOptions = {
    zoom: true
  }

  constructor(private modalController: ModalController) { }


  ngOnInit() {
  }

  ionViewDidEnter()
  {
    this.slides.update();
  }

  async zoom(zoomIn: boolean)
  {
    const slider = await this.slides.getSwiper()
    const zoom = slider.zoom;

    zoomIn ? zoom.in() : zoom.out();
  }

  close()
  {
    this.modalController.dismiss();
  }
}
