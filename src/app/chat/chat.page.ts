import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, startWith, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/servicios/chat.service';
import { Persona, Rol } from '../modelos/persona.model';
import { Chat } from '../modelos/chat.model';
import { imgFile } from '../modelos/mensaje.model';
import { UsuarioService } from '../servicios/usuario.service';
import { AuthService } from '../servicios/auth.service';

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
  searchBar = new FormControl;
  currentUser: Persona;

  chatting = false;
  searching = false;
  friends: Persona[];
  currentFriend: Persona;
  chatrooms: Chat[];
  currentChatroomId: string;

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
    private afs: AngularFirestore, private afStorage: AngularFireStorage, private router: Router, private _Activatedroute: ActivatedRoute) {

    this.isFileUploading = false;
    this.isFileUploaded = false;

    // Define uploaded files collection
    this.filesCollection = afs.collection<imgFile>('imagesCollection');
    this.files = this.filesCollection.valueChanges();
   }

  async ngOnInit() {
    this.searchBar.setValue('');
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

    this.friends = this.usuarioService.getContactos(this.currentUser.idPersona);
    console.log(this.friends);

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

  chatWith(amigo: Persona) {
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

  getFriendImage(chatroom: Chat) {
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8WPcgKdDDPzz76xNKr9pKb_xmWJznpOjs1w&usqp=CAU';
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

  private _filter(value: string): Persona[] {
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

}
