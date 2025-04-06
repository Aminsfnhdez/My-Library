import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, Timestamp } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';

export interface Libro {
  id?: string;
  titulo: string;
  autor: string;
  precio: number;
  fecha: Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class DeseoService {
  private readonly COLECCION = 'deseos';

  constructor(private firestore: Firestore) { }

  // Obtener todos los libros
  obtenerLibros(): Observable<Libro[]> {
    const librosRef = collection(this.firestore, this.COLECCION);
    return from(getDocs(librosRef)).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Libro
        }));
      })
    );
  }

  // Agregar un nuevo libro
  agregarLibro(libro: Omit<Libro, 'id'>): Observable<string> {
    const librosRef = collection(this.firestore, this.COLECCION);
    return from(addDoc(librosRef, libro)).pipe(
      map(docRef => docRef.id)
    );
  }

  // Actualizar un libro existente
  actualizarLibro(id: string, libro: Partial<Libro>): Observable<void> {
    const libroRef = doc(this.firestore, this.COLECCION, id);
    return from(updateDoc(libroRef, libro));
  }

  // Eliminar un libro
  eliminarLibro(id: string): Observable<void> {
    const libroRef = doc(this.firestore, this.COLECCION, id);
    return from(deleteDoc(libroRef));
  }
} 