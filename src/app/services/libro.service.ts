import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


interface Libro {
  id?: string;
  titulo: string;
  autor: string;
  genero: string;
  editorial: string;
  coleccion: string;
  reimpresion: string;
  estante: number;
  portadaUrl?: string;
}

@Injectable({
  providedIn: 'root'
})

export class LibroService {
  private librosCollection: any;
  
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {
    this.librosCollection = this.firestore.collection<Libro>('libros');
  }

  getLibros(): Observable<Libro[]>{
    return this.librosCollection.valueChages({idField: 'id'});
  }

  addLibro(libro: Libro, portada: File) {
    const filePath = `portadas/${new Date().getTime()}_${portada.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, portada);

    return new Promise<void>((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            libro.portadaUrl = url;
            this.librosCollection.add(libro).then(() => resolve()).catch(reject);
          });
        })
      ).subscribe();
    });
  }
}
