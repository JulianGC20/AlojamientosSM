import { ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Alojamiento } from "../../models/alojamiento";
import { AlojamientoService } from "../../services/alojamiento.service";

@Component({
  selector: "app-alojamientos",
  imports: [CommonModule, RouterLink, FormsModule, CurrencyPipe],
  templateUrl: "./alojamientos.component.html",
  styleUrl: "./alojamientos.component.css",
})
export class AlojamientosComponent implements OnInit {
  private service = inject(AlojamientoService);
  private cdr = inject(ChangeDetectorRef);

  alojamientos: Alojamiento[] = [];
  filtrados: Alojamiento[] = [];
  ciudades: string[] = [];
  tipos: string[] = [];
  cargando = true;
  error = "";

  // Valores de los filtros
  ciudad = "";
  tipo = "";
  huespedes: number | null = null;
  precioMax: number | null = null;

  ngOnInit() {
    this.service.getDisponibles().subscribe({
      next: (lista) => {
        this.alojamientos = lista;
        this.filtrados = lista;
        // Opciones de los select, sin repetir
        this.ciudades = [...new Set(lista.map((a) => a.ciudad))].sort();
        this.tipos = [...new Set(lista.map((a) => a.tipo))].sort();
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = "No se pudieron cargar los alojamientos.";
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Se ejecuta cada vez que cambia un filtro
  filtrar() {
    this.filtrados = this.alojamientos.filter(
      (a) =>
        (!this.ciudad || a.ciudad === this.ciudad) &&
        (!this.tipo || a.tipo === this.tipo) &&
        (!this.huespedes || a.capacidad >= this.huespedes) &&
        (!this.precioMax || a.precioNoche <= this.precioMax),
    );
  }

  limpiar() {
    this.ciudad = "";
    this.tipo = "";
    this.huespedes = null;
    this.precioMax = null;
    this.filtrar();
  }
}
