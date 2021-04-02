import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../shared/models/usuario';
import { UserService } from '../shared/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

  option: string;
  usuarios: Usuario[];
  bsUsuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject([]);

  constructor(private usuarioSrv: UserService, private _Activatedroute:ActivatedRoute) {
    this.usuarios = [];
  }

  async ngOnInit() {
    this._Activatedroute.paramMap.subscribe(params => {
      try{
        console.log(params);
        this.option = params.get('option');
      } catch (ex) { }
    });

    switch (this.option) {
      case 'allAsync':
        this.usuarioSrv.getAllUsersAsync().then(res => this.bsUsuarios.next(res));
        break;
      case 'allObservables':
        this.usuarioSrv.getAllUsersObservable().subscribe(res => this.bsUsuarios.next(res));
        break;
      case 'PromiseAll':
        let masc = this.usuarioSrv.getMaleUsersAsync();
        let fem = this.usuarioSrv.getFemaleUsersAsync();
        Promise.all([masc, fem]).then(res => {
          console.log(res);
          this.usuarios = res[0];
          this.usuarios = this.usuarios.concat(res[1]);
          console.log(this.usuarios);
          this.bsUsuarios.next(this.usuarios);
        })
    }
  }

  public getAllUsersObservable(): Observable<Usuario[]> {
    return new Observable((observer) => {
      setTimeout(() => { observer.next(this.usuarios) }, 2500);
    });
  }
  async todosAsync(): Promise<void> {
    this.usuarioSrv.getAllUsersAsync().then(res => {
      this.usuarios = res;
    })
  }


}
