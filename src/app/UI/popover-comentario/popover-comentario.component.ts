import { Component, Input, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { comentarioReacciones } from 'src/app/modelos/comentario.model';
import { ComentariosService } from 'src/app/servicios/comentarios.service';

@Component({
  selector: 'app-popover-comentario',
  templateUrl: './popover-comentario.component.html',
  styleUrls: ['./popover-comentario.component.scss'],
})
export class PopoverComentarioComponent implements OnInit {

  @Input() Comentario: comentarioReacciones;

  constructor(private alertCtrl: AlertController, private comentariosService: ComentariosService, private popoverCtrl: PopoverController) { }

  ngOnInit() { }

  eliminarComentario(idComentario: string){
    this.alertCtrl
      .create({
        header: '¿Estas seguro?',
        message: '¿Estas seguro que deseas eliminar este comentario?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Borrar',
            handler: async () => {
              await this.comentariosService.deleteComentario(idComentario);   
              this.popoverCtrl.dismiss({
                clicked: "Eliminar"
              })
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  modificarComentario(comentario: comentarioReacciones, clickeado: string){
    this.alertCtrl.create({
      header: 'Modificar comentario',
      inputs: [
        {
          name: 'comentarioNuevo',
          placeholder: 'Comentario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            this.popoverCtrl.dismiss({
              clicked: "Cancelar"
            })
          }
        },
        {
          text: 'Modificar',
          handler: async data => {
            if (data.comentarioNuevo !== '') {
              comentario.contenido = data.comentarioNuevo;
              await this.comentariosService.modificarComentario(comentario);  
              this.popoverCtrl.dismiss({
                clicked: "Modificar"
              })
            } else {
              return;
            }
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

}
