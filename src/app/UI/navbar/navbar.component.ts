import { Router } from "@angular/router";
import { Component, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from 'src/app/modelos/usuario.model';
import { FormBuilder, FormGroup , Validators , FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { UserFire } from '../../modelos/userFire.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';

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
  userFire: UserFire;
  userID: string;
  @Output() userImage: string;

  clickedUser;

  constructor(private usuarioService: UsuarioService,
     private authService: AuthService,
     private alertCtrl: AlertController,
     private router: Router
     ) {

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
    this.userID = this.currentUser.idPersona;
  }

  private _filter(value: string): Usuario[] {
    if(value) {
      this.searching = true;
      console.log(this.searching)
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

  async getAllUsuariosRegistrados(){
    this.usuarios = await this.usuarioService.getAllUsuariosRegistradosAsync();
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
          handler: async () => {
            this.userFire = await this.authService.getCurrentUserFire().toPromise()

                  let obs: Observable<any>;
                  obs = this.authService.deleteAccount(this.userFire.token);

                  obs.subscribe(
                    errorResponse => {
                      const code = errorResponse.error.error.message;
                      console.log(code)
                    }
                  )
                  this.usuarioService.deleteAcount(this.userFire.id)
                  this.authService.logout();
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

  irAPerfil(id: any){
    console.log(id);
    this.clickedUser = id;
    this.router.navigateByUrl('perfil/'+id);
  }
}
