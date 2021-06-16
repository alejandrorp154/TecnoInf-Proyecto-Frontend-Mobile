import { Component, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListarUsuariosRegistradosService } from 'src/app/servicios/listar-usuarios-registrados.service';
import { Usuario } from 'src/app/modelos/usuario.model';
import { FormControl } from '@angular/forms';
import { finalize, map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  dontShow: boolean = true;
  usuarios: Usuario[];
  searchResult: BehaviorSubject<any[]> = new BehaviorSubject([]);
  searchBar = new FormControl;
  searching: boolean = false;
  currentUser: Usuario;
  @Output() userImage: string;

  constructor(private listarUsuariosRegistradosService: ListarUsuariosRegistradosService,
     private authService: AuthService,
     private alertCtrl: AlertController,
     private router: Router) {
    this.usuarios = [];
  }

  ngOnInit() {
    this.searchBar.setValue('');
    this.searchResult.next(this.usuarios);
    this.getAllUsuariosRegistrados();

    this.searchBar.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value.toString()))
    ).subscribe(res => this.searchResult.next(res));
    this.getCurrentUser();
  }

  async getCurrentUser(){
    this.currentUser = await this.authService.getCurrentUser().toPromise();
    this.userImage = this.currentUser.imagenPerfil;
  }

  private _filter(value: string): Usuario[] {
    console.log(this.searchResult);
    if(value) {
      this.searching = true;
      const filterValue = value.toLocaleLowerCase();

      return this.usuarios.filter(usuario => {
        if(usuario.nickname != null){
          return (
            usuario.nombre.toLocaleLowerCase().includes(filterValue) ||
            usuario.apellido.toLocaleLowerCase().includes(filterValue) ||
            usuario.nickname.toLocaleLowerCase().includes(filterValue)
            );
        }else{
          return (
            usuario.nombre.toLocaleLowerCase().includes(filterValue) ||
            usuario.apellido.toLocaleLowerCase().includes(filterValue)
            );
        }

      });
    } else {
      this.searching = false;
    }
  }

  onLogout() {
    this.authService.logout();
  }

  async getAllUsuariosRegistrados(){
    this.usuarios = await this.listarUsuariosRegistradosService.getAllUsuariosRegistradosAsync();
  }

  onDeleteAccount()
  {
    this.alertCtrl
    .create({
      header: 'Eliminar cuenta',
      message: 'Esta a punto de borrar permanentemente su cuenta. ¿Seguro que desea continuar?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.authService.token.pipe(take(1)).subscribe(token =>
              {
                if(!token)
                {
                  throw new Error('No se encontro la ID del usuario');
                }
                else
                {
                  let obs: Observable<any>;
                  obs = this.authService.deleteAccount(token);

                  obs.subscribe(
                    errorResponse => {
                      const code = errorResponse.error.error.message;
                      console.log(code)
                    }
                  )
                  this.authService.logout();
                }
              })
          },
          cssClass: 'alrtDanger'
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        }
      ]
    })
    .then(alertEl => alertEl.present());
  }
}
