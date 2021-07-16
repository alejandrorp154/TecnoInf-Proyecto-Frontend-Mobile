import { Inject, Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/servicios/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SugerirAmigosService {

  private loadedUsers: number = 0;
  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl ,private authService: AuthService) { }

  private amigos: Usuario[];

    public getUsuariosSugeridosAsync(userID: string, size: number, event?): Promise<Usuario[]> {
      try {
        const url = `${this.baseUrl}visualizacion/sugerirAmigo/${userID}/${this.loadedUsers}/${size}`;
        let response = this.httpClient.get<Usuario[]>(url).toPromise();
        if(this.loadedUsers === 0){ this.loadedUsers += size}
        if(event)
        {
          console.log(this.loadedUsers)
          event.target.complete();
          this.loadedUsers += size;
          response.then( data => {
            if (data.length == 0) {
              event.target.disabled = true;
            }
          })
        }

        return response;
      } catch (error) {
        console.log(error);
      }
    }
}
