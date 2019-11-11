import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Mensaje } from "../interface/mensaje.interface";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) {}

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>("chats", ref =>
      ref.orderBy("date", "desc").limit(5)
    );
    return this.itemsCollection.valueChanges().pipe(
      map((msjs: Mensaje[]) => {
        console.log(msjs);
        this.chats = [];
        for (let msj of msjs) {
          this.chats.unshift(msj); // unshift = inserta en la primera posicion siempre
        }
        return this.chats;
      })
    );
    // this.itemsCollection.valueChanges(); aqui se mira todos los cambios que sucedan en ese nodo o en el doc del chat
  }

  agregarMsj(txt: string) {
    let msj: Mensaje = {
      user: "Juliana",
      mensaje: txt,
      date: new Date().getTime()
    };
    return this.itemsCollection.add(msj);
  }
}
