import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeseoService, Libro } from '../../services/deseo.service';
import { Timestamp } from '@angular/fire/firestore';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-wishes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wishes.component.html',
  styleUrl: './wishes.component.scss'
})
export class WishesComponent implements OnInit {
  isModalOpen = false;
  isEditMode = false;
  libros: Libro[] = [];
  filteredLibros: Libro[] = [];
  searchTerm: string = '';
  libro: Libro = {
    titulo: '',
    autor: ''
  };

  // Variables de paginación
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(private deseoService: DeseoService) {}

  ngOnInit() {
    this.cargarLibros();
  }

  cargarLibros() {
    this.deseoService.obtenerLibros().subscribe({
      next: (libros) => {
        this.libros = libros;
        this.filteredLibros = libros;
        this.totalItems = libros.length;
      },
      error: (error) => {
        toast.error('Error al cargar los libros', {
          description: 'No se pudieron cargar los libros de la lista'
        });
      }
    });
  }

  filterLibros() {
    if (!this.searchTerm) {
      this.filteredLibros = this.libros;
    } else {
      this.filteredLibros = this.libros.filter(libro => 
        libro.titulo.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.totalItems = this.filteredLibros.length;
    this.currentPage = 1; // Resetear a la primera página al filtrar
  }

  // Métodos de paginación
  get paginatedLibros(): Libro[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredLibros.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  openModal(libro?: Libro) {
    if (libro) {
      this.isEditMode = true;
      this.libro = { ...libro };
    } else {
      this.isEditMode = false;
      this.libro = {
        titulo: '',
        autor: ''
      };
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.isEditMode = false;
  }

  onSubmit() {
    if (this.isEditMode && this.libro.id) {
      this.deseoService.actualizarLibro(this.libro.id, this.libro).subscribe({
        next: () => {
          this.cargarLibros();
          this.closeModal();
          toast.success('Libro actualizado', {
            description: 'El libro se ha actualizado correctamente'
          });
        },
        error: (error) => {
          toast.error('Error al actualizar', {
            description: 'No se pudo actualizar el libro'
          });
        }
      });
    } else {
      this.deseoService.agregarLibro(this.libro).subscribe({
        next: () => {
          this.cargarLibros();
          this.closeModal();
          toast.success('Libro agregado', {
            description: 'El libro se ha agregado correctamente a la lista'
          });
        },
        error: (error) => {
          toast.error('Error al agregar', {
            description: 'No se pudo agregar el libro a la lista'
          });
        }
      });
    }
  }

  eliminarLibro(id: string) {
    toast.warning('¿Estás seguro de eliminar este libro?', {
      description: 'Esta acción no se puede deshacer',
      action: {
        label: 'Eliminar',
        onClick: () => {
          this.deseoService.eliminarLibro(id).subscribe({
            next: () => {
              this.cargarLibros();
              toast.success('Libro eliminado', {
                description: 'El libro se ha eliminado correctamente'
              });
            },
            error: (error) => {
              toast.error('Error al eliminar', {
                description: 'No se pudo eliminar el libro'
              });
            }
          });
        }
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {}
      }
    });
  }
}
