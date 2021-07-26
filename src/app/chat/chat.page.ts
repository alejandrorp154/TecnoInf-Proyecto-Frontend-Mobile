import { Contacto } from "./../modelos/contacto.model";
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController, IonContent } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, startWith, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/servicios/chat.service';
import { Usuario } from '../modelos/usuario.model';
import { Chat } from '../modelos/chat.model';
import { Mensaje, imgFile } from '../modelos/mensaje.model';
import { UsuarioService } from '../servicios/usuario.service';
import { AuthService } from '../servicios/auth.service';
import { Resultado, ToolsService } from "../servicios/tools.service";
import { EventoService } from "../servicios/evento.service";
import { Evento } from "../modelos/evento.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  messages: Observable<any[]>;
  newMsg = '';
  mediaUrl = '';
  //searchBar = new FormControl;
  currentUser: Usuario;

  chatting = false;
  searching = false;
  chatgrupal = false;
  uidsChatGrupal: string[];
  friends: Usuario[];
  eventos: Evento[];
  contactos: Contacto[];
  currentFriend: Usuario;
  chatrooms: Chat[];
  currentChatroomId: string;
  currentChatroom: Chat;
  searchBar = new FormControl;

  nickname = '';
  searchResult: BehaviorSubject<any[]> = new BehaviorSubject([]);


  // File upload task
  fileUploadTask: AngularFireUploadTask;

  // Upload progress
  percentageVal: Observable<number>;

  // Track file uploading with snapshot
  trackSnapshot: Observable<any>;

  // Uploaded File URL
  UploadedImageURL: Observable<string>;

  // Uploaded image collection
  files: Observable<imgFile[]>;

  // Image specifications
  imgName: string;
  imgSize: number;

  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;

  private filesCollection: AngularFirestoreCollection<imgFile>;

  constructor(private chatService: ChatService, private usuarioService: UsuarioService, private authService: AuthService,
    private alertController: AlertController, private toolsService: ToolsService, private afs: AngularFirestore, private eventoService: EventoService,
    private afStorage: AngularFireStorage, private router: Router, private _Activatedroute: ActivatedRoute) {

      this.isFileUploading = false;
      this.isFileUploaded = false;

      // Define uploaded files collection
      this.filesCollection = afs.collection<imgFile>('imagesCollection');
      this.files = this.filesCollection.valueChanges();
      this.contactos = [];
      this.eventos = [];
      this.uidsChatGrupal = [];
   }

  async ngOnInit() {
    this.chatService.inicializarVariables();
    this.authService.cerrarSesion.subscribe(res => { if(res > 0) { this.ngOnDestroy() } });
    this.searchBar.setValue('');
    let userFire = await this.authService.getCurrentUserFire().toPromise();
    console.log(userFire);
    this.eventoService.obtenerEventosXPersona(userFire.id).then(res => this.eventos = res);
    this.currentUser = await this.usuarioService.getUsuarioAsync(userFire.id);
    console.log(this.currentUser);

    this._Activatedroute.paramMap.subscribe(params => {
      try{
        console.log(params);
        this.nickname = params.get('nickname');
        this.currentChatroomId = params.get('idChat');
        console.log(this.nickname);
      } catch (ex) { }
    });
console.log(this.currentChatroomId)
    if(!this.currentChatroomId) {
      this.friends = await this.usuarioService.getAmigosAsync(this.currentUser.idPersona);
      console.log(this.friends);
    } else {
      this.usuarioService.getAmigosAsync(this.currentUser.idPersona).then(res => this.friends = res);
    }
    //this.friends = this.getContactosPersona();
    if((!this.nickname || this.nickname == '') && (!this.currentChatroomId || this.currentChatroomId == '')) {
      try{
        this.chatService.obtenerMisChats().subscribe(res => {
          console.log(res);
          this.chatrooms = res;
          console.log(this.chatrooms);
        });

        this.searchResult.next(this.friends);
      } catch(ex) { console.log(ex); }

    } else if (this.currentChatroomId != '') {
      this.chatting = true;
      this.searching = false;
      this.messages = this.chatService.obtenerMensajes(this.currentChatroomId);
      this.chatService.obtenerChat(this.currentChatroomId).subscribe(res => {
        console.log(res.data());
        this.currentChatroom = res.data();
      });
    } else {
      this.chatting = true;
      if (this.friends.some(f => f.nickname === this.nickname)) {
        this.currentFriend = this.friends.find(f => f.nickname === this.nickname);
      } else {
        this.currentChatroomId = this.nickname;
      }

      console.log(this.currentFriend);
      if (this.currentFriend) {
        if (this.chatrooms && this.chatrooms.some(c => c.uids == [this.currentUser.idPersona, this.currentFriend.idPersona])) {
          this.messages = this.chatService.obtenerMensajes(this.chatrooms.find(c => c.uids == [this.currentUser.idPersona, this.currentFriend.idPersona]).idChat);
        } else {
          this.chatService.crearChat([this.currentUser.idPersona, this.currentFriend.idPersona], this.currentFriend.nombre + ' ' + this.currentFriend.apellido).then(res => {
            this.currentChatroomId = res;
            console.log('Chatroom creado: ' ,res);
          });
          this.messages = new Observable((observer) => observer.next([]));
        }
      } else {
        this.messages = this.chatService.obtenerMensajes(this.currentChatroomId);
        let cchrom = this.chatrooms.find(c => c.idChat === this.currentChatroomId);
        this.currentFriend = this.friends.find(f => f.idPersona === cchrom.uids.find(g => g != this.currentUser.idPersona));
      }
    }


    this.searchBar.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value.toString()))
    ).subscribe(res => this.searchResult.next(res));

  }

  ngOnDestroy() {
    console.log('****** ngOnDestroy Chat ******');
    this.isFileUploading = false;
    this.isFileUploaded = false;
    this.searchResult.next([]);

    this.files = this.filesCollection.valueChanges();
    this.contactos = [];
    this.eventos = [];
    this.uidsChatGrupal = [];
    this.chatrooms = [];
    this.currentUser = null;
    this.friends = [];
    this.chatService.restablecerVariables();
  }

  getContactosPersona(){
    let t= this;
    let lista: Usuario[] = [];
    if(this.contactos) {
      this.contactos.forEach(function(contacto){
        let persona = t.usuarioService.getUsuario(contacto.idPersona);
        lista.push(persona);
      })
    }
    return lista;
  }

  chatWith(amigo: Usuario) {
    console.log(amigo);
    if (this.chatgrupal) {
      console.log('entró al chat grupal');
      if (this.uidsChatGrupal.some(uid => uid == amigo.idPersona)) {
        this.uidsChatGrupal.splice(this.uidsChatGrupal.findIndex(uid => uid == amigo.idPersona), 1)
        console.log('lo agregó al uidschatgrupal');
      } else {
        this.uidsChatGrupal.push(amigo.idPersona);
      }
    } else {
      this.searchBar.setValue('');
      if (this.chatrooms && this.chatrooms.some(c => c.uids == [this.currentUser.idPersona, amigo.idPersona])) {
        this.router.navigateByUrl('/chat/' + this.chatrooms.find(c => c.uids == [this.currentUser.idPersona, amigo.idPersona]));
      } else {
        this.chatService.crearChat([this.currentUser.idPersona, amigo.idPersona], amigo.nombre + ' ' + amigo.apellido).then(res => {
          this.currentChatroomId = res;
          console.log('Chatroom creado: ' ,res);
          this.router.navigateByUrl('/chat/' + res);
        });
      }
    }
  }

  crearChatGrupal(nombreChat: string) {
    this.uidsChatGrupal.push(this.currentUser.idPersona);
    console.log(nombreChat);
    this.chatService.crearChat(this.uidsChatGrupal, nombreChat).then(res => {
      this.currentChatroomId = res;
      console.log('Chatroom grupal creado: ', res);
      this.chatgrupal = false;
      this.searching = false;
      this.router.navigateByUrl('/chat/' + res);
    })
  }

  chatearGrupal() {
    this.searching = true;
    this.chatgrupal = true;
    this.searchResult.next(this.friends);
  }

  goChatroom(chatroom: Chat) {
    console.log(chatroom);
    this.router.navigateByUrl('/chat/' + chatroom['id']);
  }

  getFriendImage(chatroom: Chat) {
    if(chatroom.uids.length != 2) {
      //console.log('la cantidad de integrantes del chat es distinta de 2');
      let str = this.getImageByIdChat(chatroom.idChat);
      return str != '' ? str : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8WPcgKdDDPzz76xNKr9pKb_xmWJznpOjs1w&usqp=CAU';
    } else {
      try {
        //console.log('la cantidad de integrantes del chat es 2', this.friends);
        //console.log(this.friends.find(f => chatroom.uids.find(u => u != this.currentUser.idPersona) == f.idPersona));
        return this.friends.find(f => chatroom.uids.find(u => u != this.currentUser.idPersona) == f.idPersona) ?
          this.friends.find(f => chatroom.uids.find(u => u != this.currentUser.idPersona) == f.idPersona).imagenPerfil : '../../assets/img/defaultProfileImage.png';
      } catch(err) {
        console.log(err);
        return '../../assets/img/defaultProfileImage.png';
      }
    }
  }

  getSearchFriendImage(amigo: Usuario) {
    if(this.chatgrupal && this.uidsChatGrupal.some(uid => uid == amigo.idPersona)) {
      return '../../assets/img/Null.png';
    } else {
      return amigo.imagenPerfil;
    }
  }

  getChatroomName(chatroom: Chat) {
    if(chatroom.uids.length == 2) {
      try {
        let pers = this.friends.find(f => f.idPersona == chatroom.uids.find(u => u != this.currentUser.idPersona));
        let nombre = '';
        if (pers) { nombre = pers.nombre + ' ' + pers.apellido; }
        //console.log(nombre);
        return nombre;
      } catch (ex) { /*console.log(ex);*/ }
    }else {
      return chatroom.nombre;
    }
  }


  getImageByIdChat(idChat: string): string {
    //console.log(this.eventos);
    if (this.eventos && this.eventos.length > 0) {
      try {
        return this.eventos.find(e => e.idChat == idChat).imagen;
      } catch {
        return '';
      }
    } else { return ''; }
  }

  enviarMessage() {
    console.log(this.newMsg, this.mediaUrl, this.currentChatroomId);
    this.chatService.addChatMessage(this.newMsg, this.mediaUrl, this.currentChatroomId, this.currentUser.nombre + ' ' + this.currentUser.apellido).then(() => {
      this.newMsg = '';
      this.mediaUrl = '';
      this.content.scrollToBottom();
      this.isFileUploaded = false;
    });
  }

  private _filter(value: string): Usuario[] {
    console.log(this.chatrooms);
    if(value) {
      this.searching = true;
      const filterValue = value.toLocaleLowerCase();

      return this.friends.filter(amigo => {
        if(amigo.apellido) {
          return (amigo.nombre.toLocaleLowerCase().includes(filterValue) || amigo.apellido.toLocaleLowerCase().includes(filterValue));
        } else {
          return amigo.nombre.toLocaleLowerCase().includes(value.toLocaleLowerCase());
        }
      });
    } else {
      this.searching = false;
    }
  }

  uploadImage(event: FileList) {

    const file = event.item(0)

    // Image validation
    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!')
      return;
    }

    this.isFileUploading = true;
    this.isFileUploaded = false;

    this.imgName = file.name;

    // Storage path
    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;

    // Image reference
    const imageRef = this.afStorage.ref(fileStoragePath);

    // File upload task
    this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);
console.log('está subiendo el archivo');
    // Show uploading progress
    this.percentageVal = this.fileUploadTask.percentageChanges();
    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(

      finalize(() => { console.log('finalize called');
        // Retreive uploaded image storage path
        this.UploadedImageURL = imageRef.getDownloadURL();

        this.UploadedImageURL.subscribe(resp=>{
          this.storeFilesFirebase({
            name: file.name,
            filepath: resp,
            size: this.imgSize
          });
          this.isFileUploading = false;
          this.isFileUploaded = true;
          console.log(resp);
          this.mediaUrl = resp;
        },error=>{
          console.log(error);
        })
      }),
      tap(snap => {
          this.imgSize = snap.totalBytes;
      })
    )
  }


  storeFilesFirebase(image: imgFile) {
      const fileId = this.afs.createId();

      this.filesCollection.doc(fileId).set(image).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
  }


  eliminarAlert(chat: Chat) {
    console.log(chat);
    let message
    let bttnText
    message = '¿Estas seguro que deseas eliminar este chat?'
    bttnText = 'Borrar'
    this.alertController
      .create({
        header: '¿Estas seguro?',
        message: message,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: bttnText,
            handler: () => {
              this.eliminar(chat['id']);
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }


  async eliminar(idChat: string) {
    console.log(idChat);
    if(this.chatrooms.some(c => c.idChat == idChat) && this.chatrooms.find(c => c.idChat == idChat).uids.length == 1){
      await this.chatService.eliminar(idChat).then(res => {
        console.log(res);
        console.log(this.chatrooms.findIndex(e => e.idChat == idChat));
        console.log(this.chatrooms);
        //this.chatrooms.splice(this.chatrooms.findIndex(e => e.idChat == idChat),1);
        console.log(this.chatrooms);
        //this.searchResult.next(this.chatrooms);
        this.toolsService.presentToast('El chat se eliminó correctamente', Resultado.Ok);
      }).catch(error => {
        this.toolsService.presentToast('Surgió un error al eliminar el chat', Resultado.Error);
      });
    } else {
      this.chatService.removerUsuarioDeChat(idChat, this.currentUser.idPersona);
    }

  }


}
