import { Component, OnInit } from '@angular/core';
import { Ubicacion } from '../modelos/ubicacion.model';
import { VisualizarUbicacionesService } from '../servicios/visualizar-ubicaciones.service';
import { AuthService } from '../servicios/auth.service';
import { take } from 'rxjs/operators';
import { UserFire } from '../modelos/userFire.model';

@Component({
  selector: 'app-visualizar-ubicaciones',
  templateUrl: './visualizar-ubicaciones.page.html',
  styleUrls: ['./visualizar-ubicaciones.page.scss'],
})
export class VisualizarUbicacionesPage implements OnInit {

  public ubicaciones: Ubicacion[];
  public user: UserFire;
  
  constructor(private authService: AuthService, private ubicacionesService: VisualizarUbicacionesService) {
    this.ubicaciones = [];
  }

  async ngOnInit() {
    await this.getAllUbicaciones();
    console.log("testaso: ",this.ubicaciones);
  }

  async getAllUbicaciones(){
    this.user = await this.authService.getCurrentUserFire().toPromise()
    this.ubicaciones = await this.ubicacionesService.getAllUbicacionesAsync(this.user.id);
    
  }

}
