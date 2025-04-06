import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export interface Libro {
  id?: string;
  titulo: string;
  autor: string;
  genero: string;
  edicion: string;
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
  private librosCollection;
  
  constructor(private firestore: Firestore, private storage: Storage) {
    this.librosCollection = collection(this.firestore, 'libros');
  }

  getLibros(): Observable<Libro[]> {
    return collectionData(this.librosCollection, { idField: 'id' }) as Observable<Libro[]>;
  }

  async addLibro(libro: Libro, portada: File): Promise<void> {
    const filePath = `portadas/${new Date().getTime()}_${portada.name}`;
    const storageRef = ref(this.storage, filePath);
    
    try {
      const snapshot = await uploadBytes(storageRef, portada);
      const url = await getDownloadURL(snapshot.ref);
      libro.portadaUrl = url;
      await addDoc(this.librosCollection, libro);
    } catch (error) {
      console.error('Error al agregar libro:', error);
      throw error;
    }
  }

  async updateLibro(id: string, libro: Libro, portada?: File): Promise<void> {
    const libroRef = doc(this.firestore, 'libros', id);
    
    try {
      if (portada) {
        // Si hay una nueva portada, subirla y actualizar la URL
        const filePath = `portadas/${new Date().getTime()}_${portada.name}`;
        const storageRef = ref(this.storage, filePath);
        const snapshot = await uploadBytes(storageRef, portada);
        const url = await getDownloadURL(snapshot.ref);
        
        // Eliminar la imagen anterior si existe
        if (libro.portadaUrl) {
          const oldImageRef = ref(this.storage, libro.portadaUrl);
          await deleteObject(oldImageRef).catch(() => {});
        }
        
        libro.portadaUrl = url;
      }
      
      await updateDoc(libroRef, { ...libro });
    } catch (error) {
      console.error('Error al actualizar libro:', error);
      throw error;
    }
  }

  async deleteLibro(id: string): Promise<void> {
    const libroRef = doc(this.firestore, 'libros', id);
    
    try {
      // Obtener el libro para eliminar su imagen
      const libro = await this.getLibroById(id);
      if (libro && libro.portadaUrl) {
        const imageRef = ref(this.storage, libro.portadaUrl);
        await deleteObject(imageRef).catch(() => {});
      }
      
      await deleteDoc(libroRef);
    } catch (error) {
      console.error('Error al eliminar libro:', error);
      throw error;
    }
  }

  private async getLibroById(id: string): Promise<Libro | null> {
    const libroRef = doc(this.firestore, 'libros', id);
    const libroDoc = await getDoc(libroRef);
    return libroDoc.exists() ? { id: libroDoc.id, ...libroDoc.data() } as Libro : null;
  }
}
