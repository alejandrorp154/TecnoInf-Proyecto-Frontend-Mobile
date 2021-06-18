import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../modelos/usuario.model';
import { startWith, map } from 'rxjs/operators';
import { UsuarioService } from '../servicios/usuario.service';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-listar-contactos',
  templateUrl: './listar-contactos.page.html',
  styleUrls: ['./listar-contactos.page.scss'],
})
export class ListarContactosPage implements OnInit {

  currentUser: Usuario;
  searchResult: BehaviorSubject<any[]> = new BehaviorSubject([]);
  searching: boolean = false;
  contactos: Usuario[];
  contactosAux: Usuario[];
  searchBar = new FormControl;
  filterTerm: string;
  constructor(private userService: UsuarioService, private authService: AuthService)
  {
    this.contactos = []
    this.contactosAux = [];
    this.getUserAndFriends().then(async res => this.getContactos().then(res => this.searchResult.next(this.contactos)));
  }

  ngOnInit() {

    this.searchBar.setValue('');
    this.searchBar.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value.toString()))
    ).subscribe(res => this.searchResult.next(res));
  }

  private _filter(value: string): Usuario[] {
    console.log("alo?", this.searchResult);
    if(value) {
      this.searching = true;
      const filterValue = value.toLocaleLowerCase();

      return this.contactos.filter(usuario => {
        if(usuario.nickname != null){
          return (
            usuario.nombre.toLocaleLowerCase().includes(filterValue) ||
            usuario.apellido.toLocaleLowerCase().includes(filterValue) ||
            usuario.nickname.toLocaleLowerCase().includes(filterValue) ||
            usuario.direccion.toLocaleLowerCase().includes(filterValue)
            );
        }else{
          return (
            usuario.nombre.toLocaleLowerCase().includes(filterValue) ||
            usuario.apellido.toLocaleLowerCase().includes(filterValue)||
            usuario.direccion.toLocaleLowerCase().includes(filterValue)
            );
        }
      });
    } else {
      this.searching = false;
    }
  }

  async getUserAndFriends()
  {
    this.currentUser = await this.authService.getCurrentUser().toPromise();
  }

  async getContactos(evento?)
  {
    this.contactosAux = await this.userService.getContactos(this.currentUser.idPersona, 4, evento)
    this.contactosAux.forEach(element => {
      this.contactos.push(element)

    });
  }

  onViewProfile(userID: string)
  {

  }
}
