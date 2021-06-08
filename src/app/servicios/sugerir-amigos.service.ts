import { Injectable } from '@angular/core';
import { Usuario } from '../Models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/servicios/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SugerirAmigosService {
  private idUsuario: string;
  private loadedUsers: number = 0;
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  private amigos: Usuario[];

    private baseUrl = 'http://3.18.102.215:8080/pryectoBack-web/rest';

    public async getUsuariosSugeridosAsync(size: number, event?): Promise<Usuario[]> {

      this.getUserID();
      try {
        const url = `${this.baseUrl}/visualizacion/sugerirAmigo/${this.idUsuario}/${this.loadedUsers}/${size}`;
        let response = await this.httpClient.get<Usuario[]>(url).toPromise();
        this.loadedUsers += 10;

        if(event)
        {
          event.target.complete();
        }

        return response;
      } catch (error) {
        console.log(error);
      }
    }

    private getUserID()
    {
      this.authService.userID.pipe(take(1)).subscribe(userID =>
        {
          if(!userID)
          {
            throw new Error('No se encontro la ID del usuario.');
          }
          else
          {
              this.idUsuario = userID;
          }
        });

    }

}
