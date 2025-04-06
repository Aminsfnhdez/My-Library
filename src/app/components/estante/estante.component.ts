import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { LibroService, Libro } from '../../services/libro.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-estante',
  standalone: true,
  imports: [
    PanelModule,
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './estante.component.html',
  styleUrl: './estante.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class EstanteComponent implements OnInit {
  libros: Libro[] = [];
  librosFiltrados: Libro[] = [];
  estantes: number[] = [];
  loading: boolean = true;
  error: string | null = null;
  terminoBusqueda: string = '';
  
  // Variables para el modal
  displayModal: boolean = false;
  nuevoLibro: Libro = {
    titulo: '',
    autor: '',
    genero: '',
    edicion: '',
    editorial: '',
    coleccion: '',
    reimpresion: '',
    estante: 1
  };
  portadaSeleccionada: File | null = null;
  esEdicion: boolean = false;
  libroEditando: Libro | null = null;

  constructor(
    private libroService: LibroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.libroService.getLibros().subscribe({
      next: (libros) => {
        console.log('Libros recibidos:', libros);
        this.libros = libros;
        this.librosFiltrados = libros;
        this.estantes = [...new Set(libros.map(libro => libro.estante))].sort((a, b) => a - b);
        console.log('Estantes:', this.estantes);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar libros:', err);
        this.error = 'Error al cargar los libros';
        this.loading = false;
      }
    });
  }

  mostrarModal(edicion: boolean = false, libro?: Libro) {
    this.esEdicion = edicion;
    if (edicion && libro) {
      this.libroEditando = libro;
      this.nuevoLibro = { ...libro };
    } else {
      this.libroEditando = null;
      this.nuevoLibro = {
        titulo: '',
        autor: '',
        genero: '',
        edicion: '',
        editorial: '',
        coleccion: '',
        reimpresion: '',
        estante: 1
      };
    }
    this.displayModal = true;
  }

  ocultarModal() {
    this.displayModal = false;
    this.nuevoLibro = {
      titulo: '',
      autor: '',
      genero: '',
      edicion: '',
      editorial: '',
      coleccion: '',
      reimpresion: '',
      estante: 1
    };
    this.portadaSeleccionada = null;
    this.esEdicion = false;
    this.libroEditando = null;
  }

  onFileSelected(event: any) {
    this.portadaSeleccionada = event.target.files[0];
  }

  async guardarLibro() {
    if (!this.portadaSeleccionada && !this.esEdicion) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar una portada' });
      return;
    }

    try {
      if (this.esEdicion && this.libroEditando) {
        await this.libroService.updateLibro(
          this.libroEditando.id!, 
          this.nuevoLibro, 
          this.portadaSeleccionada || undefined
        );
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro actualizado correctamente' });
      } else {
        await this.libroService.addLibro(this.nuevoLibro, this.portadaSeleccionada!);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro agregado correctamente' });
      }
      this.ocultarModal();
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar el libro' });
    }
  }

  editarLibro(libro: Libro) {
    this.mostrarModal(true, libro);
  }

  eliminarLibro(libro: Libro) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este libro?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-danger',
      accept: async () => {
        try {
          await this.libroService.deleteLibro(libro.id!);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro eliminado correctamente' });
        } catch (error) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el libro' });
        }
      }
    });
  }

  buscarLibros() {
    if (!this.terminoBusqueda.trim()) {
      this.librosFiltrados = this.libros;
    } else {
      const termino = this.terminoBusqueda.toLowerCase();
      this.librosFiltrados = this.libros.filter(libro => 
        libro.titulo.toLowerCase().includes(termino)
      );
    }
    this.estantes = [...new Set(this.librosFiltrados.map(libro => libro.estante))].sort((a, b) => a - b);
  }

  getLibrosPorEstante(estante: number): Libro[] {
    const libros = this.librosFiltrados.filter(libro => libro.estante === estante);
    console.log(`Libros para estante ${estante}:`, libros);
    return libros;
  }
}
