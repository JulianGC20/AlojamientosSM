import { ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Alojamiento } from "../../models/alojamiento";
import { AlojamientoService } from "../../services/alojamiento.service";

@Component({
  selector: "app-inicio",
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: "./inicio.component.html",
  styleUrl: "./inicio.component.css",
})
export class InicioComponent implements OnInit {
  private service = inject(AlojamientoService);
  private cdr = inject(ChangeDetectorRef);

  destacados: Alojamiento[] = [];
  cargando = true;
  error = "";

  ngOnInit(): void {
    this.service.getDestacados().subscribe({
      next: (alojamientos) => {
        this.destacados = alojamientos;
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
}
