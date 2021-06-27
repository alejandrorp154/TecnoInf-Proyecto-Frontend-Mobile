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
import { imgFile } from '../modelos/mensaje.model';
import { UsuarioService } from '../servicios/usuario.service';
import { AuthService } from '../servicios/auth.service';
import { Resultado, ToolsService } from "../servicios/tools.service";
import { EventoService } from "../servicios/evento.service";

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
  friends: Usuario[];
  contactos: Contacto[];
  currentFriend: Usuario;
  chatrooms: Chat[];
  currentChatroomId: string;
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
   }

  async ngOnInit() {
    //this.searchBar.setValue('');
    let userFire = await this.authService.getCurrentUserFire().toPromise();
    console.log(userFire);
    this.currentUser = await this.usuarioService.getUsuarioAsync(userFire.id);
    console.log(this.currentUser);
    /*/ *********************************************************************
    this.currentUser = {idPersona: 'WnVrwbfSYjYULq1uCQ0pUOZhBH13', nickname: 'michel', nombre: 'Michel',
      apellido: 'Jackson', celular: '099999999', email: 'mj@mail.com', rol: Rol.Turista};
    // *********************************************************************/
    this._Activatedroute.paramMap.subscribe(params => {
      try{
        console.log(params);
        this.nickname = params.get('nickname');
        console.log(this.nickname);
      } catch (ex) { }
    });

    this.friends = await this.usuarioService.getAmigosAsync(this.currentUser.idPersona);
    console.log(this.friends);
    //this.friends = this.getContactosPersona();

    try{

      this.chatService.obtenerMisChats().subscribe(res => {
        console.log(res);
        this.chatrooms = res;
        console.log(this.chatrooms);
      });
      if (!this.nickname || this.nickname == '') {
        this.searchResult.next(this.friends);

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
            /*this.chatService.createChatroom([this.currentUser.uid, this.currentFriend.uid]).then(res => {
              this.currentChatroomId = res.id;
              console.log('Chatroom creado: ' ,res.id);
            });*/
            this.messages = new Observable((observer) => observer.next([]));
          }
        } else {
          this.messages = this.chatService.obtenerMensajes(this.currentChatroomId);
          let cchrom = this.chatrooms.find(c => c.idChat === this.currentChatroomId);
          this.currentFriend = this.friends.find(f => f.idPersona === cchrom.uids.find(g => g != this.currentUser.idPersona));
        }
      }
    } catch(ex) { console.log(ex); }





    this.searchBar.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value.toString()))
    ).subscribe(res => this.searchResult.next(res));

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

  goChatroom(chatroom: Chat) {
    console.log(chatroom);
    this.router.navigateByUrl('/chat/' + chatroom.idChat);
  }

  async getFriendImage(chatroom: Chat) {
    if(chatroom.uids.length != 2) {
      let str = '';
      await this.eventoService.getImageByIdChat(this.currentUser.idPersona, chatroom.idChat).then(res => str = res);
      return str != '' ? str : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8WPcgKdDDPzz76xNKr9pKb_xmWJznpOjs1w&usqp=CAU';
    } else {
      try {
        return this.friends.find(f => chatroom.uids.find(u => u != this.currentUser.idPersona) == f.idPersona).imagenPerfil;
      } catch(err) {
        console.log(err);
        return '../../assets/img/defaultProfileImage.png';
      }
    }
  }

  getChatroomName(chatroom: Chat) {
      return chatroom.nombre;
  }

  enviarMessage() {
    this.chatService.addChatMessage(this.newMsg, this.mediaUrl, this.currentChatroomId).then(() => {
      this.newMsg = '';
      this.mediaUrl = '';
      this.content.scrollToBottom();
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
    message = '¿Estas seguro que deseas eliminar este evento?'
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
              this.eliminar(chat.idChat);
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
    await this.chatService.eliminar(idChat).then(res => {
      console.log(res);
      console.log(this.chatrooms.findIndex(e => e.idChat == idChat));
      console.log(this.chatrooms);
      this.chatrooms.splice(this.chatrooms.findIndex(e => e.idChat == idChat),1);
      console.log(this.chatrooms);
      this.searchResult.next(this.chatrooms);
      this.toolsService.presentToast('El chat se eliminó correctamente', Resultado.Ok);
    }).catch(error => {
      this.toolsService.presentToast('Surgió un error al eliminar el chat', Resultado.Error);
    });
  }


}
